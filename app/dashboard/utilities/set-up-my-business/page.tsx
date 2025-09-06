import type { NextPage } from 'next';
import Head from 'next/head';

// Building Icon for "Enter Business Details"
const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0v-4m0 4h5m0 0v-4m0 4h5m0 0v-4m0 4h2M9 7h6m-6 4h6m-6 4h6" />
  </svg>
);

// Close Icon
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const VyaparSetupPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Set Up My Business on Vyapar</title>
      </Head>
      <div className="bg-gray-100 min-h-screen p-4 sm:p-8 flex flex-col items-center">
        <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg">
          {/* Header */}
          <header className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">Set Up My Business on</h1>
              <span className="ml-2 text-xl font-bold">
                <span className="text-red-500">V</span>yapar
              </span>
            </div>
            <button>
              <CloseIcon />
            </button>
          </header>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left Side: Form */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-6">
                  <BuildingIcon />
                  <h2 className="text-lg font-semibold text-gray-700">Enter Business Details</h2>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-600 mb-1">
                        Company Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        defaultValue="heloo"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600 mb-1">
                        Phone Number<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="phoneNumber"
                        defaultValue="9310891509"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="businessCategory" className="block text-sm font-medium text-gray-600 mb-1">
                      Choose Business Category<span className="text-red-500">*</span>
                    </label>
                    <select
                      id="businessCategory"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      defaultValue="Accounting & CA"
                    >
                      <option>Accounting & CA</option>
                      <option>IT Services</option>
                      <option>Manufacturing</option>
                    </select>
                  </div>
                </form>
              </div>

              <div className="flex justify-end items-center mt-12 pt-6 border-t">
                <button className="px-6 py-2 text-gray-600 font-semibold rounded-md hover:bg-gray-200 mr-4">
                  Cancel
                </button>
                <button className="bg-red-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-red-600 flex items-center">
                  Next <span className="ml-2">→</span>
                </button>
              </div>
            </div>

            {/* Right Side: Invoice Preview */}
            <div className="bg-gray-50 p-8">
              <div className="bg-white p-6 border rounded-md shadow-sm text-xs">
                <h3 className="text-center font-bold text-base mb-4">Sample Tax Invoice</h3>
                <div className="border p-2 mb-2">
                  <p className="font-bold">heloo</p>
                  <p>Phone: 9310891509</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                  <div className="border p-2">
                    <p className="font-semibold">Bill To:</p>
                    <p>Sample Party</p>
                    <p>Sample Address</p>
                    <p>Contact Number: 9333 911 911</p>
                  </div>
                  <div className="border p-2">
                    <p className="font-semibold">Invoice Details:</p>
                    <p>No: Sample 01</p>
                    <p>Date: 06/09/2025</p>
                  </div>
                </div>

                {/* Items Table */}
                <table className="w-full border-collapse border text-center mb-2">
                  <thead>
                    <tr className="bg-gray-100">
                      {['#', 'Item Name', 'HSN/SAC', 'Qty', 'Unit', 'Price/Unit(₹)', 'GST(₹)', 'Amount(₹)'].map(h => 
                        <th key={h} className="border p-1 font-semibold">{h}</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-1">1</td>
                      <td className="border p-1">Sample Item</td>
                      <td className="border p-1">123456</td>
                      <td className="border p-1">1</td>
                      <td className="border p-1">STRP</td>
                      <td className="border p-1 text-right">₹ 380.95</td>
                      <td className="border p-1 text-right">₹ 19.05</td>
                      <td className="border p-1 text-right">₹ 400</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="font-bold">
                        <td colSpan={3} className="border p-1 text-left">Total</td>
                        <td className="border p-1">1</td>
                        <td colSpan={3} className="border p-1"></td>
                        <td className="border p-1 text-right">₹ 400</td>
                    </tr>
                  </tfoot>
                </table>

                {/* Tax Summary */}
                <div className="flex justify-between items-start mb-2">
                    <div className="w-2/3">
                        <p className="font-semibold p-1">Tax Summary:</p>
                        <table className="w-full border-collapse border text-center">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th rowSpan={2} className="border p-1 font-semibold">HSN/SAC</th>
                                    <th rowSpan={2} className="border p-1 font-semibold">Taxable amount (₹)</th>
                                    <th colSpan={2} className="border p-1 font-semibold">CGST</th>
                                    <th colSpan={2} className="border p-1 font-semibold">SGST</th>
                                    <th rowSpan={2} className="border p-1 font-semibold">Total Tax (₹)</th>
                                </tr>
                                <tr className="bg-gray-100">
                                    <th className="border p-1 font-semibold">Rate (%)</th>
                                    <th className="border p-1 font-semibold">Amt (₹)</th>
                                    <th className="border p-1 font-semibold">Rate (%)</th>
                                    <th className="border p-1 font-semibold">Amt (₹)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-1">123456</td>
                                    <td className="border p-1 text-right">380.95</td>
                                    <td className="border p-1">2.5</td>
                                    <td className="border p-1 text-right">9.52</td>
                                    <td className="border p-1">2.5</td>
                                    <td className="border p-1 text-right">9.52</td>
                                    <td className="border p-1 text-right">19.05</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr className="font-bold">
                                    <td className="border p-1">TOTAL</td>
                                    <td className="border p-1 text-right">380.95</td>
                                    <td colSpan={2} className="border p-1 text-right">9.52</td>
                                    <td colSpan={2} className="border p-1 text-right">9.52</td>
                                    <td className="border p-1 text-right">19.05</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="w-1/3 pl-4 space-y-1">
                        <div className="flex justify-between"><span className="font-semibold">Sub Total :</span> <span>₹ 400.00</span></div>
                        <div className="flex justify-between font-bold"><span >Total :</span> <span>₹ 400.00</span></div>
                        <div className="text-left mt-2">
                          <p className="font-semibold">Invoice Amount in Words:</p>
                          <p>Four Hundred Rupees only</p>
                        </div>
                         <div className="flex justify-between pt-2"><span className="font-semibold">Received :</span> <span>₹ 400.00</span></div>
                         <div className="flex justify-between"><span className="font-semibold">Balance :</span> <span>₹ 0.00</span></div>
                    </div>
                </div>

                <div className="border p-2 mb-2">
                  <p className="font-semibold">Terms & Conditions:</p>
                  <p>Thanks for doing business with us!</p>
                </div>
                
                <div className="border p-2 text-right h-24 flex flex-col justify-between">
                  <p className="font-semibold text-left">For My Company:</p>
                  <p className="pr-8">Authorized Signatory</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default VyaparSetupPage;