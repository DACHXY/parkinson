import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { jsonRequest } from '../../../axios';
import './index.scss';
import Header from '../../../components/Header';

export async function HistroyItemLoader({ params }) {
  const { id } = params;
  const historyItemResult = await jsonRequest.get(`history/${id}`);
  if (!historyItemResult.ok) throw new Error('History data fetch error');
  const historyItemData = await historyItemResult.json();
  return { historyItemData };
}

function HistoryItemPage() {
  const { historyItemData } = useLoaderData();
  return (
    <div>
      <Header />
      <div>{`HistoryItemPage ${JSON.stringify(historyItemData)}`}</div>
    </div>
  );
}

export default HistoryItemPage;
