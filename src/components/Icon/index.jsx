import React from 'react';
import './index.scss';

export function Film({ className }) {
  return (
    <svg className={`${className && className}`} width="150" height="151" viewBox="0 0 150 151" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M123.875 13H26.125C18.6001 13 12.5 19.1001 12.5 26.625V124.375C12.5 131.9 18.6001 138 26.125 138H123.875C131.4 138 137.5 131.9 137.5 124.375V26.625C137.5 19.1001 131.4 13 123.875 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M43.75 13V138" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M106.25 13V138" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 75.5H137.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 44.25H43.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 106.75H43.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M106.25 106.75H137.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M106.25 44.25H137.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Image({ className }) {
  return (
    <svg className={`${className && className}`} width="118" height="119" viewBox="0 0 118 119" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M93.4167 15.25H24.5833C19.1525 15.25 14.75 19.6525 14.75 25.0833V93.9167C14.75 99.3475 19.1525 103.75 24.5833 103.75H93.4167C98.8475 103.75 103.25 99.3475 103.25 93.9167V25.0833C103.25 19.6525 98.8475 15.25 93.4167 15.25Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M41.7917 49.6666C45.8648 49.6666 49.1667 46.3647 49.1667 42.2916C49.1667 38.2185 45.8648 34.9166 41.7917 34.9166C37.7186 34.9166 34.4167 38.2185 34.4167 42.2916C34.4167 46.3647 37.7186 49.6666 41.7917 49.6666Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M103.25 74.25L78.6666 49.6667L24.5833 103.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Music({ className }) {
  return (
    <svg className={`${className && className}`} width="118" height="119" viewBox="0 0 118 119" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M44.25 89V25.0833L103.25 15.25V79.1667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M29.5 103.75C37.6462 103.75 44.25 97.1462 44.25 89C44.25 80.8538 37.6462 74.25 29.5 74.25C21.3538 74.25 14.75 80.8538 14.75 89C14.75 97.1462 21.3538 103.75 29.5 103.75Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M88.5 93.9167C96.6462 93.9167 103.25 87.3129 103.25 79.1667C103.25 71.0205 96.6462 64.4167 88.5 64.4167C80.3538 64.4167 73.75 71.0205 73.75 79.1667C73.75 87.3129 80.3538 93.9167 88.5 93.9167Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Filter({ className }) {
  return (
    <svg className={`${className && className}`} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.8333 3.25H2.16663L10.8333 13.4983V20.5833L15.1666 22.75V13.4983L23.8333 3.25Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 20H24" stroke="currentColor" strokeWidth="2" strokeMiterlimit="16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 17V23" stroke="currentColor" strokeWidth="2" strokeMiterlimit="16" strokeLinecap="round" />
    </svg>
  );
}

export function Female({ className }) {
  return (
    <svg className={`${className && className}`} width="167" height="167" viewBox="0 0 167 167" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="84" cy="56" r="43" stroke="#FF9696" strokeWidth="14" />
      <path d="M53 122H114" stroke="#FF9696" strokeWidth="12" strokeLinecap="round" />
      <path d="M84 161V100" stroke="#FF9696" strokeWidth="12" strokeLinecap="round" />
    </svg>
  );
}

export function Male({ className }) {
  return (
    <svg className={`${className && className}`} width="167" height="167" viewBox="0 0 167 167" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="73" cy="97" r="43" stroke="#96D3FF" strokeWidth="14" />
      <path d="M102 64.8797L144.374 21" stroke="#96D3FF" strokeWidth="12" strokeLinecap="round" />
      <path d="M83 21L144 21" stroke="#96D3FF" strokeWidth="12" strokeLinecap="round" />
      <path d="M144 82V21" stroke="#96D3FF" strokeWidth="12" strokeLinecap="round" />
    </svg>
  );
}
