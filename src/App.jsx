import React, { useState } from 'react';
import { Search, Plus, User, Star, Clock, CheckCircle, AlertCircle, Shield, X } from 'lucide-react';

const P2PLendingApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [userType, setUserType] = useState('borrower');
  const [loans, setLoans] = useState([
    {
      id: 1,
      amount: 50000,
      purpose: 'Medical Emergency',
      duration: '3 months',
      interest: 12,
      borrower: 'Rahul K.',
      rating: 4.5,
      status: 'active',
      verified: true,
      aadhaarVerified: true,
      offers: [
        { id: 1, lender: 'Sita M.', amount: 50000, interest: 12, rating: 4.6, aadhaarVerified: true },
        { id: 2, lender: 'Arjun P.', amount: 30000, interest: 11, rating: 4.3, aadhaarVerified: true }
      ]
    },
    {
      id: 2,
      amount: 25000,
      purpose: 'Business Equipment',
      duration: '6 months',
      interest: 15,
      borrower: 'Priya S.',
      rating: 4.2,
      status: 'active',
      verified: true,
      aadhaarVerified: true,
      offers: []
    },
    {
      id: 3,
      amount: 75000,
      purpose: 'Education',
      duration: '12 months',
      interest: 10,
      borrower: 'Amit M.',
      rating: 4.8,
      status: 'funded',
      verified: true,
      aadhaarVerified: false,
      offers: []
    }
  ]);

  const [selectedLoan, setSelectedLoan] = useState(null);
  const [lendAmount, setLendAmount] = useState('');
  const [showOffers, setShowOffers] = useState(false);
  const [showAadhaarVerification, setShowAadhaarVerification] = useState(false);
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [userAadhaarVerified, setUserAadhaarVerified] = useState(false);

  const handleLendOffer = (loan) => {
    setSelectedLoan(loan);
    setCurrentView('lend');
  };

  const handleAadhaarVerification = () => {
    if (aadhaarNumber.length === 12) {
      setUserAadhaarVerified(true);
      setShowAadhaarVerification(false);
      alert('Aadhaar verification successful! ✓');
    } else {
      alert('Please enter a valid 12-digit Aadhaar number');
    }
  };

  const handleViewOffers = (loan) => {
    setSelectedLoan(loan);
    setShowOffers(true);
  };

  const handleAcceptOffer = (offer) => {
    alert(`Offer accepted from ${offer.lender} for ₹${offer.amount.toLocaleString()}`);
    setShowOffers(false);
    setSelectedLoan(null);
  };

  const handleRejectOffer = (offerId) => {
    const updatedLoans = loans.map(loan => {
      if (loan.id === selectedLoan.id) {
        return {
          ...loan,
          offers: loan.offers.filter(offer => offer.id !== offerId)
        };
      }
      return loan;
    });
    setLoans(updatedLoans);
    setSelectedLoan(updatedLoans.find(l => l.id === selectedLoan.id));
  };

  const handleSubmitLoanOffer = () => {
    if (!lendAmount || !selectedLoan) return;
    
    const newOffer = {
      id: Date.now(),
      lender: 'You',
      amount: parseInt(lendAmount),
      interest: selectedLoan.interest,
      rating: 4.5,
      aadhaarVerified: userAadhaarVerified
    };

    const updatedLoans = loans.map(loan => {
      if (loan.id === selectedLoan.id) {
        return {
          ...loan,
          offers: [...loan.offers, newOffer]
        };
      }
      return loan;
    });

    setLoans(updatedLoans);
    alert('Your lending offer has been submitted!');
    setCurrentView('browse');
    setLendAmount('');
    setSelectedLoan(null);
  };

  const handleUPIPayment = () => {
    alert('Redirecting to UPI payment...\nUPI ID: lending-app@paytm');
    setCurrentView('home');
    setSelectedLoan(null);
  };

  const renderHome = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Welcome to LendConnect</h2>
        <p className="opacity-90">Connect, lend, and borrow with trust</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => setCurrentView('browse')}
          className="bg-green-500 text-white p-4 md:p-6 rounded-lg hover:bg-green-600 transition-colors"
        >
          <div className="text-center">
            <Search className="mx-auto mb-2" size={24} />
            <div className="font-semibold text-lg">Browse Loans</div>
            <div className="text-sm opacity-90">Lend Money</div>
          </div>
        </button>
        <button
          onClick={() => setCurrentView('request')}
          className="bg-blue-500 text-white p-4 md:p-6 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <div className="text-center">
            <Plus className="mx-auto mb-2" size={24} />
            <div className="font-semibold text-lg">Request Loan</div>
            <div className="text-sm opacity-90">Borrow Money</div>
          </div>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Profile Status</h3>
          {!userAadhaarVerified && (
            <button
              onClick={() => setShowAadhaarVerification(true)}
              className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm hover:bg-orange-600 transition-colors"
            >
              Verify Aadhaar
            </button>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <User className="text-gray-500" size={20} />
            <span className="text-sm">Basic Profile</span>
            <CheckCircle className="text-green-500" size={16} />
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="text-gray-500" size={20} />
            <span className="text-sm">Aadhaar Verified</span>
            {userAadhaarVerified ? (
              <CheckCircle className="text-green-500" size={16} />
            ) : (
              <X className="text-red-500" size={16} />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderBrowse = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Available Loans</h2>
        <div className="flex items-center space-x-2">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search loans..."
            className="border rounded px-3 py-1 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loans.filter(loan => loan.status === 'active').map(loan => (
          <div key={loan.id} className="bg-white rounded-lg shadow-md p-4 md:p-6 border">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg">₹{loan.amount.toLocaleString()}</h3>
                <p className="text-gray-600 text-sm">{loan.purpose}</p>
                {loan.offers.length > 0 && (
                  <p className="text-blue-600 text-sm font-medium">{loan.offers.length} offer(s) received</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {loan.verified && <CheckCircle className="text-green-500" size={16} />}
                {loan.aadhaarVerified && <Shield className="text-blue-500" size={16} />}
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-500 fill-current" size={16} />
                  <span className="text-sm">{loan.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-500">Duration:</span>
                <span className="ml-2 font-medium">{loan.duration}</span>
              </div>
              <div>
                <span className="text-gray-500">Interest:</span>
                <span className="ml-2 font-medium">{loan.interest}% p.a.</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <User size={16} />
                <span className="text-sm">{loan.borrower}</span>
                {loan.aadhaarVerified && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Aadhaar ✓</span>}
              </div>
              <div className="flex space-x-2">
                {loan.borrower !== 'You' && (
                  <button
                    onClick={() => handleLendOffer(loan)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                  >
                    Lend
                  </button>
                )}
                {loan.offers.length > 0 && loan.borrower === 'You' && (
                  <button
                    onClick={() => handleViewOffers(loan)}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
                  >
                    View Offers
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRequest = () => (
    <div className="space-y-4">
      <h2 className="text-xl md:text-2xl font-bold">Request a Loan</h2>
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Amount (₹)
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Purpose
            </label>
            <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Medical Emergency</option>
              <option>Business</option>
              <option>Education</option>
              <option>Home Improvement</option>
              <option>Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Repayment Duration
            </label>
            <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>3 months</option>
              <option>6 months</option>
              <option>12 months</option>
              <option>24 months</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proposed Interest Rate (% p.a.)
            </label>
            <input
              type="number"
              placeholder="e.g., 12"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Details
            </label>
            <textarea
              placeholder="Explain your need and repayment plan..."
              rows="3"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="md:col-span-2">
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              Submit Loan Request
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );

  const renderLend = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Lend Money</h2>
      {selectedLoan && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Loan Details</h3>
            <div className="mt-2 space-y-2">
              <p><span className="font-medium">Amount:</span> ₹{selectedLoan.amount.toLocaleString()}</p>
              <p><span className="font-medium">Purpose:</span> {selectedLoan.purpose}</p>
              <p><span className="font-medium">Duration:</span> {selectedLoan.duration}</p>
              <p><span className="font-medium">Interest:</span> {selectedLoan.interest}% p.a.</p>
              <p><span className="font-medium">Borrower:</span> {selectedLoan.borrower}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount to Lend (₹)
            </label>
            <input
              type="number"
              value={lendAmount}
              onChange={(e) => setLendAmount(e.target.value)}
              placeholder="Enter amount"
              max={selectedLoan.amount}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">Maximum: ₹{selectedLoan.amount.toLocaleString()}</p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <AlertCircle className="text-yellow-600 mr-2" size={20} />
              <span className="text-sm text-yellow-800">
                Expected monthly return: ₹{lendAmount ? Math.round((parseInt(lendAmount) * selectedLoan.interest * 1.01) / 12) : 0}
              </span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setCurrentView('browse')}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitLoanOffer}
              disabled={!lendAmount}
              className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              Submit Offer
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">LendConnect</h1>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="text-white" size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 pb-20 md:pb-6">
        {currentView === 'home' && renderHome()}
        {currentView === 'browse' && renderBrowse()}
        {currentView === 'request' && renderRequest()}
        {currentView === 'lend' && renderLend()}
      </div>

      {/* Offers Modal */}
      {showOffers && selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm md:max-w-md w-full max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Loan Offers</h3>
              <button
                onClick={() => setShowOffers(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            {selectedLoan.offers.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No offers yet</p>
            ) : (
              <div className="space-y-3">
                {selectedLoan.offers.map(offer => (
                  <div key={offer.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{offer.lender}</span>
                        {offer.aadhaarVerified && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            Aadhaar ✓
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-500 fill-current" size={14} />
                        <span className="text-sm">{offer.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      ₹{offer.amount.toLocaleString()} at {offer.interest}% interest
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAcceptOffer(offer)}
                        className="flex-1 bg-green-500 text-white py-2 rounded text-sm hover:bg-green-600 transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectOffer(offer.id)}
                        className="flex-1 bg-red-500 text-white py-2 rounded text-sm hover:bg-red-600 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Aadhaar Verification Modal */}
      {showAadhaarVerification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm md:max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Aadhaar Verification</h3>
              <button
                onClick={() => setShowAadhaarVerification(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield size={16} />
                <span>Verify your identity to build trust with lenders</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aadhaar Number
                </label>
                <input
                  type="text"
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value)}
                  placeholder="Enter 12-digit Aadhaar number"
                  maxLength="12"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAadhaarVerification(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAadhaarVerification}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation - Only show on mobile */}
      <div className="md:hidden fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t shadow-lg">
        <div className="grid grid-cols-3 py-2">
          <button
            onClick={() => setCurrentView('home')}
            className={`flex flex-col items-center py-2 px-4 ${currentView === 'home' ? 'text-blue-500' : 'text-gray-500'}`}
          >
            <div className="w-6 h-6 mb-1">🏠</div>
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => setCurrentView('browse')}
            className={`flex flex-col items-center py-2 px-4 ${currentView === 'browse' ? 'text-blue-500' : 'text-gray-500'}`}
          >
            <div className="w-6 h-6 mb-1">💰</div>
            <span className="text-xs">Lend</span>
          </button>
          <button
            onClick={() => setCurrentView('request')}
            className={`flex flex-col items-center py-2 px-4 ${currentView === 'request' ? 'text-blue-500' : 'text-gray-500'}`}
          >
            <div className="w-6 h-6 mb-1">📋</div>
            <span className="text-xs">Request</span>
          </button>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block bg-white border-t shadow-lg mt-8">
        <div className="max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-center space-x-8">
            <button
              onClick={() => setCurrentView('home')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'home' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>🏠</span>
              <span>Home</span>
            </button>
            <button
              onClick={() => setCurrentView('browse')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'browse' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>💰</span>
              <span>Lend</span>
            </button>
            <button
              onClick={() => setCurrentView('request')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'request' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>📋</span>
              <span>Request</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default P2PLendingApp;