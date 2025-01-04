import React from 'react';
import Image from 'next/image';

interface LoaderProps {
  className?: string;
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({ className = '', size = 120 }) => {
  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center align-content-center py-4">
      <div className={`loader-container ${className}`}>
        <Image
          src="/assets/gif/loading.gif"
          alt="Loading..."
          width={size}
          height={size}
          priority
        />
        <style jsx>{`
                    .loader-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        max-width: ${size}px;
                        max-height: ${size}px;
                    }
                `}</style>
      </div>
    </div>
  );
};

export default Loader;