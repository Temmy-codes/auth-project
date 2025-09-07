import React from 'react';

export default function LoadingSpinner({ size = 36 }) {
  return (
    <div style={{ display: 'inline-block', width: size, height: size }}>
      <svg viewBox="0 0 50 50" style={{ width: '100%', height: '100%' }}>
        <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="31.4 31.4">
          <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.9s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}
