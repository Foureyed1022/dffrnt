import React, { useState } from 'react';
import { isValidImageUrl } from '../../utils/security';

interface SecureImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export const SecureImage: React.FC<SecureImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = '/placeholder-image.jpg'
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(fallbackSrc);
    }
  };

  const handleLoad = () => {
    // Validate the image URL for security
    if (!isValidImageUrl(src)) {
      console.warn(`Potentially unsafe image URL: ${src}`);
    }
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
      onLoad={handleLoad}
      loading="lazy"
      decoding="async"
    />
  );
};