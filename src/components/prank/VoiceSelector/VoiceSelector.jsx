import React from 'react';
import { Play, Volume2 } from 'lucide-react';

export const VoiceSelector = ({
  voices,
  selectedVoice,
  onVoiceSelect,
  onVoicePreview,
  playingVoice,
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Choose Your Voice
      </label>
      <div className="space-y-3 max-h-80 md:max-h-96 overflow-y-auto">
        {voices.map((voice) => (
          <div
            key={voice.id}
            className={`p-3 md:p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
              selectedVoice === voice.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onVoiceSelect(voice.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-xl md:text-2xl">{voice.emoji}</span>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm md:text-base">{voice.name}</h4>
                  <p className="text-xs md:text-sm text-gray-600">{voice.description}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onVoicePreview(voice.id);
                }}
                className="p-1.5 md:p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex-shrink-0"
              >
                {playingVoice === voice.id ? (
                  <Volume2 className="w-3 h-3 md:w-4 md:h-4 text-purple-600 animate-pulse" />
                ) : (
                  <Play className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};