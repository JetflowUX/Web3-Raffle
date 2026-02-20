import React from 'react';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

export const EthereumIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L5 12.5L12 16L19 12.5L12 2Z" fill="currentColor" fillOpacity="0.6"/>
    <path d="M12 16L5 12.5L12 22L19 12.5L12 16Z" fill="currentColor"/>
  </svg>
);

export const SolanaIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 17L7 14H20C20.5 14 20.7 14.6 20.3 15L17 18H4C3.5 18 3.3 17.4 3.7 17H4Z" fill="currentColor"/>
    <path d="M4 7L7 10H20C20.5 10 20.7 9.4 20.3 9L17 6H4C3.5 6 3.3 6.6 3.7 7H4Z" fill="currentColor"/>
    <path d="M17 12L20 9C20.4 8.6 20.5 8 20 8H7L4 11C3.6 11.4 3.5 12 4 12H17Z" fill="currentColor"/>
  </svg>
);

export const PolkadotIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
    <circle cx="12" cy="4" r="2" fill="currentColor" fillOpacity="0.7"/>
    <circle cx="12" cy="20" r="2" fill="currentColor" fillOpacity="0.7"/>
    <circle cx="19" cy="8" r="1.8" fill="currentColor" fillOpacity="0.6"/>
    <circle cx="5" cy="8" r="1.8" fill="currentColor" fillOpacity="0.6"/>
    <circle cx="19" cy="16" r="1.8" fill="currentColor" fillOpacity="0.6"/>
    <circle cx="5" cy="16" r="1.8" fill="currentColor" fillOpacity="0.6"/>
  </svg>
);

export const CardanoIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
    <circle cx="12" cy="5" r="1.5" fill="currentColor" fillOpacity="0.8"/>
    <circle cx="12" cy="19" r="1.5" fill="currentColor" fillOpacity="0.8"/>
    <circle cx="18" cy="7.5" r="1.3" fill="currentColor" fillOpacity="0.7"/>
    <circle cx="6" cy="7.5" r="1.3" fill="currentColor" fillOpacity="0.7"/>
    <circle cx="18" cy="16.5" r="1.3" fill="currentColor" fillOpacity="0.7"/>
    <circle cx="6" cy="16.5" r="1.3" fill="currentColor" fillOpacity="0.7"/>
    <circle cx="19.5" cy="12" r="1.2" fill="currentColor" fillOpacity="0.6"/>
    <circle cx="4.5" cy="12" r="1.2" fill="currentColor" fillOpacity="0.6"/>
  </svg>
);

export const AptosIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6H10V10H6V6Z" fill="currentColor" fillOpacity="0.5"/>
    <path d="M14 6H18V10H14V6Z" fill="currentColor" fillOpacity="0.7"/>
    <path d="M6 14H10V18H6V14Z" fill="currentColor" fillOpacity="0.7"/>
    <path d="M14 14H18V18H14V14Z" fill="currentColor"/>
    <path d="M10 10H14V14H10V10Z" fill="currentColor" fillOpacity="0.8"/>
  </svg>
);

export const AvalancheIcon: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L4 19H9L12 13L15 19H20L12 3Z" fill="currentColor"/>
    <path d="M14 15H10L12 11L14 15Z" fill="currentColor" fillOpacity="0.4"/>
  </svg>
);
