import { useState, useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { Button } from '@/components/common/components/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/components/Avatar';

interface ProfileImageUploadProps {
  currentImage?: string;
  userName?: string;
  onImageChange: (imageUrl: string) => void;
}

export default function ProfileImageUpload({ 
  currentImage, 
  userName, 
  onImageChange 
}: ProfileImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB');
      return;
    }

    setIsUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewImage(result);
      };
      reader.readAsDataURL(file);

      // In a real app, you would upload to a service like Cloudinary, AWS S3, etc.
      // For now, we'll use the preview as the image URL
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          onImageChange(result);
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1000);

    } catch (error) {
      console.error('Error uploading image:', error);
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const displayImage = previewImage || currentImage;

  return (
    <div className="flex items-center space-x-6">
      <div className="relative">
        <Avatar className="w-24 h-24">
          <AvatarImage src={displayImage} alt={userName || 'User'} />
          <AvatarFallback className="bg-blue-600 text-white text-2xl">
            {userName?.split(' ').map((n) => n[0]).join('') || 'U'}
          </AvatarFallback>
        </Avatar>
        
        {displayImage && (
          <button
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          variant="outline"
          className="flex items-center space-x-2"
        >
          {isUploading ? (
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Camera className="w-4 h-4" />
          )}
          <span>{isUploading ? 'Uploading...' : 'Change Photo'}</span>
        </Button>
        
        <p className="text-xs text-zinc-400">
          JPG, PNG or GIF. Max size 2MB.
        </p>
      </div>
    </div>
  );
}