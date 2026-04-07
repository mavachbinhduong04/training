/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

// --- Types & Data ---
import { Category, Scanner, BarcodePrinter } from './types';

// --- Components ---
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ProductDetailModal } from './components/ProductDetailModal';
import { LoginModal } from './components/LoginModal';

// --- Pages ---
import { Dashboard } from './pages/Dashboard';
import { Scanners } from './pages/Scanners';
import { Printers } from './pages/Printers';
import { PrinterAccessories } from './pages/PrinterAccessories';
import { Ribbons } from './pages/Ribbons';
import { Training } from './pages/Training';

export default function App() {
  const [activeTab, setActiveTab] = useState<Category>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Scanner | BarcodePrinter | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'scanners':
        return <Scanners setSelectedProduct={setSelectedProduct} />;
      case 'printers':
        return <Printers setSelectedProduct={setSelectedProduct} />;
      case 'printerAccessories':
        return <PrinterAccessories />;
      case 'ribbons':
        return <Ribbons />;
      case 'training':
        return <Training />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  if (!isLoggedIn) {
    return (
      <LoginModal 
        isOpen={true} 
        onClose={() => {}} 
        onLogin={(success) => setIsLoggedIn(success)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Product Detail Modal */}
      <ProductDetailModal 
        selectedProduct={selectedProduct} 
        setSelectedProduct={setSelectedProduct} 
        isLoggedIn={isLoggedIn}
      />

      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
      />

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <Header />

        <div className="p-8 max-w-[1600px] mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
