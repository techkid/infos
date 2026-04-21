"use client";

import { useState, useEffect } from 'react';

interface InfoProvider {
  displayName: string;
  internalName: string;
  inUse: boolean;
}

interface AppData {
  infoProviders: InfoProvider[];
  deliveryMethods: InfoProvider[];
}

export default function Home() {
  const [step, setStep] = useState(1);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [selectedDeliveryIndices, setSelectedDeliveryIndices] = useState<Set<number>>(new Set());
  const [infoProviders, setInfoProviders] = useState<InfoProvider[]>([]);
  const [deliveryMethods, setDeliveryMethods] = useState<InfoProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/infos');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: AppData = await response.json();
        setInfoProviders(data.infoProviders);
        setDeliveryMethods(data.deliveryMethods);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error loading data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleBox = (index: number, type: 'provider' | 'method') => {
    if (type === 'provider') {
      setSelectedIndices((prev) => {
        const newSelected = new Set(prev);
        if (newSelected.has(index)) {
          newSelected.delete(index);
        } else {
          newSelected.add(index);
        }
        return newSelected;
      });
    } else {
      setSelectedDeliveryIndices((prev) => {
        const newSelected = new Set(prev);
        if (newSelected.has(index)) {
          newSelected.delete(index);
        } else {
          newSelected.add(index);
        }
        return newSelected;
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <p className="text-xl font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <p className="text-xl font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center pt-20 p-8 font-sans">
      {step === 1 ? (
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-80
            0">
            Pick the infos you'd like to receive
          </h1>
        </header>
      ) : (
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            How do you want to get them?
          </h1>
        </header>
      )}

      <div className="flex flex-wrap justify-center gap-6 max-w-4xl">
        {step === 1
          ? infoProviders.map((provider, index) => {
              const isSelected = selectedIndices.has(index);
              const colorClass = isSelected
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-white text-black border-gray-200";

              return (
                <div
                  key={provider.internalName}
                  onClick={() => toggleBox(index, 'provider')}
                  className={`w-40 h-32 flex items-center justify-center rounded-2xl border p-4 text-center font-medium shadow-sm cursor-pointer transition-colors ${colorClass}`}
                >
                  {provider.displayName}
                </div>
              );
            })
          : (
            <>
              <div className="w-full flex flex-wrap justify-center gap-2 mb-4">
                {infoProviders.map((provider, index) => {
                  if (selectedIndices.has(index)) {
                    return (
                      <span
                        key={provider.internalName}
                        className="px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                      >
                        {provider.displayName}
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
              {deliveryMethods.map((method, index) => {
                const isSelected = selectedDeliveryIndices.has(index);
                const colorClass = isSelected
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-white text-black border-gray-200";

                return (
                  <div
                    key={method.internalName}
                    onClick={() => toggleBox(index, 'method')}
                    className={`w-40 h-32 flex items-center justify-center rounded-2xl border p-4 text-center font-medium shadow-sm cursor-pointer transition-colors ${colorClass}`}
                  >
                    {method.displayName}
                  </div>
                );
              })}
            </>
          )}
      </div>

      <div className="w-full flex justify-center gap-4 mt-12">
        {step > 1 && (
          <button
            onClick={() => setStep(1)}
            className="px-8 py-3 bg-gray-400 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 transition-colors"
          >
            Back
          </button>
        )}
        <button
          onClick={() => setStep(step + 1)}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          disabled={step === 2}
        >
          Next
        </button>
      </div>
    </div>
  );
}
