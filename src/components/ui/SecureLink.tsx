import React from 'react';
import { Link } from 'react-router-dom';
import { getSecureLinkProps } from '../../utils/security';

interface SecureLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const SecureLink: React.FC<SecureLinkProps> = ({
  to,
  children,
  className = ''
}) => {
  const isExternal = !to.startsWith('/') && !to.startsWith('#');
  const secureProps = getSecureLinkProps(to);

  if (isExternal) {
    return (
      <a
        href={to}
        className={className}
        {...secureProps}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};