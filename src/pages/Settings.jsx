import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { FiUser, FiLock, FiCamera, FiMail, FiUser as FiName } from 'react-icons/fi';

function Settings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      console.log('Getting user profile...');
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('Error getting user:', userError);
        setMessage('Error loading user data');
        return;
      }
      
      if (user) {
        console.log('User found:', user.email, 'ID:', user.id);
        setUser(user);
        setEmail(user.email || '');

        // Get profile data
        const { data, error: profileError } = await supabase
          .from('profiles')
          .select('full_name, avatar_url, email')
          .eq('id', user.id)
          .single();

        if (profileError && profileError.code === 'PGRST116') {
          console.log('No profile found yet, creating one...');
          // Si no existe el perfil, lo creamos
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              email: user.email,
              full_name: '',
              avatar_url: ''
            });
          
          if (insertError) {
            console.error('Error creating profile:', insertError);
            setMessage('Error creating profile');
          } else {
            console.log('Profile created successfully');
          }
        } else if (data) {
          console.log('Profile data loaded:', data);
          setFullName(data.full_name || '');
          setAvatarUrl(data.avatar_url || '');
          console.log('Avatar URL set to:', data.avatar_url);
          // Asegurar que el email esté actualizado
          if (data.email) {
            setEmail(data.email);
          }
        } else if (profileError) {
          console.error('Error loading profile:', profileError);
          setMessage('Error loading profile data');
        }
      } else {
        console.log('No user found - redirecting to login');
        setMessage('Please log in to access settings');
        // Opcional: redirigir al login
        // navigate('/');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      setMessage('Error loading profile data');
    }
  };

  const uploadAvatar = async (file) => {
    try {
      if (!user || !user.id) {
        throw new Error('User not authenticated');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      console.log('Uploading file:', fileName);

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      console.log('File uploaded successfully. Public URL:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    }
  };

  const updateProfile = async (newAvatarUrl = null) => {
    try {
      if (!user || !user.id) {
        throw new Error('User not authenticated');
      }

      const updates = {
        id: user.id,
        email: user.email,
        full_name: fullName,
        avatar_url: newAvatarUrl || avatarUrl,
        updated_at: new Date(),
      };

      console.log('Updating profile with:', updates);

      const { error } = await supabase
        .from('profiles')
        .upsert(updates);

      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }

      console.log('Profile updated successfully');
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error in updateProfile:', error);
      setMessage('Error updating profile: ' + error.message);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Mostrar vista previa inmediatamente de la nueva imagen
      setProfileImage(file);
      setMessage('');
      console.log('New image selected:', file.name);
    }
  };

  const clearSelectedImage = () => {
    setProfileImage(null);
    setMessage('');
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      if (!user || !user.id) {
        setMessage('Please log in to update your profile');
        setIsLoading(false);
        return;
      }

      let newAvatarUrl = avatarUrl;
      
      // Si hay una nueva imagen seleccionada, subirla primero
      if (profileImage && typeof profileImage === 'object') {
        console.log('Uploading new image...');
        const publicUrl = await uploadAvatar(profileImage);
        newAvatarUrl = publicUrl;
        setAvatarUrl(publicUrl);
        console.log('Image uploaded:', publicUrl);
      }
      
      // Actualizar perfil en la base de datos
      await updateProfile(newAvatarUrl);
      
      // Limpiar el estado de la imagen temporal después de guardar
      setProfileImage(null);
      
    } catch (error) {
      console.error('Error in handleProfileUpdate:', error);
      setMessage('Error updating profile: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage('Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch {
      setMessage('An error occurred while updating password');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Account Settings</h1>
        
        {/* Profile Information Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <FiUser className="text-blue-600 mr-3" size={24} />
            <h2 className="text-xl font-semibold">Profile Information</h2>
          </div>
          
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    // Mostrar vista previa de la nueva imagen seleccionada
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt="Profile Preview"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : avatarUrl ? (
                    // Mostrar imagen guardada en la base de datos
                    <img
                      src={avatarUrl}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    // Mostrar icono por defecto
                    <FiUser size={40} className="text-gray-400" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition">
                  <FiCamera size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isLoading}
                  />
                </label>
                {profileImage && (
                  <button
                    type="button"
                    onClick={clearSelectedImage}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full cursor-pointer hover:bg-red-600 transition text-xs"
                    title="Cancel selection"
                  >
                    ×
                  </button>
                )}
              </div>
              
              <div className="flex-1">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <FiName className="absolute left-3 top-3 text-gray-400" size={16} />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-3 text-gray-400" size={16} />
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full pl-10 p-3 border border-gray-300 rounded-md bg-gray-50"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FiLock className="text-blue-600 mr-3" size={24} />
            <h2 className="text-xl font-semibold">Change Password</h2>
          </div>
          
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your current password"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your new password"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm your new password"
              />
            </div>
            
            {message && (
              <div className={`p-3 rounded-md ${
                message.includes('successfully') 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {message}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings; 