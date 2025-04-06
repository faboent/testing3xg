import PermissionChecker from '@/components/PrivacyComponent/PermissionChecker';
import DetailsQuote from '@/components/Quote/DetailsQuote';
import GetAllQuote from '@/components/Quote/GetAllQuote';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

export default function QuotationRoutes() {
  return (
    <Routes>
      {" "}
      <Route
        path="/quotation"
        element={
          <PermissionChecker permission={"readAll-quote"}>
            <GetAllQuote />
          </PermissionChecker>
        }
      />
      <Route
        path="/quotation/:id"
        element={
          <PermissionChecker permission={"readSingle-quote"}>
            <DetailsQuote />
          </PermissionChecker>
        }
      />
    </Routes>
  );
}
