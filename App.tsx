import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Tabs, Tab } from './components/Tabs';
import { ImageGenerator } from './components/ImageGenerator';
import { ImageEditor } from './components/ImageEditor';
import { ImageDisplay } from './components/ImageDisplay';
import { generateImage, editImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('generate');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const handleGenerateImage = useCallback(async (prompt: string) => {
    if (!prompt) return;
    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);
    try {
      const imageB64 = await generateImage(prompt);
      setGeneratedImageUrl(`data:image/png;base64,${imageB64}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleEditImage = useCallback(async (prompt: string, imageFile: File) => {
    if (!prompt || !imageFile) return;
    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);
    try {
      const base64Data = await fileToBase64(imageFile);
      const imagePayload = {
        mimeType: imageFile.type,
        data: base64Data,
      };
      const imageB64 = await editImage(prompt, imagePayload);
      setGeneratedImageUrl(`data:image/png;base64,${imageB64}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="flex flex-col space-y-6">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
              {activeTab === 'generate' ? (
                <ImageGenerator onGenerate={handleGenerateImage} isLoading={isLoading} />
              ) : (
                <ImageEditor onEdit={handleEditImage} isLoading={isLoading} />
              )}
            </div>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700 flex items-center justify-center min-h-[300px] lg:min-h-0">
            <ImageDisplay
              isLoading={isLoading}
              error={error}
              imageUrl={generatedImageUrl}
            />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Powered by Google Gemini. Built for creative exploration.</p>
      </footer>
    </div>
  );
};

export default App;
