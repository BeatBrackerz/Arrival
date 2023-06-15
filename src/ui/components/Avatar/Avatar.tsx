import {useState, useEffect} from 'react';
import {supabase, useSupabase} from '../../../utils/supabase';
import {View, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface Props {
  size: number;
  className?: string;
}

const Avatar = ({size = 150, className = ''}: Props) => {
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const avatarSize = {height: size, width: size};
  const {user, logout} = useSupabase();

  useEffect(() => {
    downloadImage(user.avatar_url);
  }, [user]);

  const downloadImage = async (path: string) => {
    try {
      const {data, error} = await supabase.storage
        .from('avatars')
        .download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error downloading image: ', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const uploadAvatar = async () => {
    try {
      setLoading(true);

      const file = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (file.canceled) return;

      const photo = {
        // @ts-ignore
        uri: file.assets[0].uri,
        type: ImagePicker.MediaTypeOptions.Images,
        // @ts-ignore
        name: file.assets[0].uri,
      };

      const formData = new FormData();
      // @ts-ignore
      formData.append('file', photo);

      const fileExt = photo.uri.split('.').pop();
      const filePath = `${Math.random()}.${fileExt}`;

      const updates = {
        id: user.id,
        avatar_url: filePath,
        updated_at: new Date(),
      };

      const {error: profileError} = await supabase
        .from('profiles')
        .upsert(updates);
      const {error} = await supabase.storage
        .from('avatars')
        .upload(filePath, formData);

      if (error || profileError) throw error;

      await downloadImage(filePath);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={logout}
      disabled={loading}
      className={`${
        loading ? 'opacity-60 rounded-s' : 'opacity-100'
      } ${className}`}
    >
      {avatarUrl ? (
        <Image
          source={{uri: avatarUrl}}
          accessibilityLabel="Avatar"
          style={[avatarSize]}
          className="rounded-full overflow-hidden max-w-full object-cover pt-0"
        />
      ) : (
        <View
          style={[avatarSize]}
          className="rounded-full overflow-hidden max-w-full bg-slate-700 border"
        >
          {loading && <ActivityIndicator />}
        </View>
      )}

      {/*
                <View>
                <Button
                    title={uploading ? 'Uploading ...' : 'Upload'}
                    onPress={uploadAvatar}
                    disabled={uploading}
                />
            </View>
            */}
    </TouchableOpacity>
  );
};

export default Avatar;
