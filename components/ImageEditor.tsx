import React, { useState, useRef } from 'react';

interface ImageEditorProps {
  onEdit: (prompt: string, imageFile: File) => void;
  isLoading: boolean;
}

const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);


export const ImageEditor: React.FC<ImageEditorProps> = ({ onEdit, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageFile) {
      onEdit(prompt, imageFile);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          1. Upload an image to edit
        </label>
        <div 
          className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-600 border-dashed rounded-md cursor-pointer hover:border-indigo-500 transition-colors"
          onClick={triggerFileInput}
        >
          <div className="space-y-1 text-center">
            {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="mx-auto h-24 w-auto object-contain rounded-md" />
            ) : (
                <UploadIcon className="mx-auto h-12 w-12 text-slate-400" />
            )}
            <div className="flex text-sm text-slate-500">
              <p className="pl-1">{imageFile ? imageFile.name : 'Click to upload a file'}</p>
            </div>
            <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
        <input ref={fileInputRef} id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
      </div>

      <div>
        <label htmlFor="edit-prompt" className="block text-sm font-medium text-slate-300 mb-2">
          2. Describe how you want to change it
        </label>
        <textarea
          id="edit-prompt"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          placeholder="e.g., Add a futuristic city in the background"
          disabled={!imageFile}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !prompt.trim() || !imageFile}
        className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Editing...
          </>
        ) : 'Edit Image'}
      </button>
    </form>
  );
};
