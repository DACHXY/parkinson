import React from 'react';
import { useParams } from 'react-router-dom';
import './index.scss';

export function HistroyItemLoader() {

}

function HistoryItemPage() {
  const { id } = useParams();
  return (
    <div>{`HistoryItemPage ${id}`}</div>
  );
}

export default HistoryItemPage;
