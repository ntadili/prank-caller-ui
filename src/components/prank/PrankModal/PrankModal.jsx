import React, { useState, useEffect } from 'react';
import { Phone, ArrowLeft, Play, Pause, Download, CheckCircle, Loader2, X, Star, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';

const STATUS_SEQUENCE = [
  { message: "Initiating call", subtitle: "Setting up connection", duration: 2000 },
  { message: "Ringing {targetName}", subtitle: "Waiting for answer", duration: 4000 },
  { message: "Call connected", subtitle: "Prank in progress", duration: 8000 },
  { message: "Call completed", subtitle: "Processing recording", duration: 3000 }
];

function PrankModal({ isOpen, onClose, targetName = "your friend" }) {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setCurrentStatusIndex(0);
      setIsComplete(false);
      setShowFeedback(false);
      setUserRating(0);
      setUserComment('');
      setFeedbackSubmitted(false);
      return;
    }

    let timeoutId;

    const advanceStatus = () => {
      if (currentStatusIndex < STATUS_SEQUENCE.length - 1) {
        timeoutId = setTimeout(() => {
          setCurrentStatusIndex(prev => prev + 1);
        }, STATUS_SEQUENCE[currentStatusIndex].duration);
      } else {
        // Final status completed - show completion
        timeoutId = setTimeout(() => {
          setIsComplete(true);
        }, STATUS_SEQUENCE[currentStatusIndex].duration);
      }
    };

    advanceStatus();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentStatusIndex, isOpen]);

  const currentStatus = STATUS_SEQUENCE[currentStatusIndex];

  const handleFeedbackSubmit = () => {
    if (userRating === 0) {
      alert('Please rate your prank experience!');
      return;
    }
    
    // Mock feedback submission
    console.log('Feedback submitted:', { rating: userRating, comment: userComment });
    setFeedbackSubmitted(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      setFeedbackSubmitted(false);
    }, 2000);
  };

  const getSubtitle = () => {
    return currentStatus?.subtitle.replace('{targetName}', targetName) || '';
  };

  const getMessage = () => {
    return currentStatus?.message.replace('{targetName}', targetName) || '';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-modal-fade-in">
      <div className="bg-gradient-to-br from-white/95 via-white/90 to-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto transform animate-modal-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gradient-to-r from-purple-200/30 via-pink-200/30 to-orange-200/30">
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            {showFeedback ? 'How was your prank?' : 'Prank Call Status'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/50 hover:bg-white/70 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/30"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Feedback Form */}
          {showFeedback && (
            <div className="text-center animate-fade-up">
              {feedbackSubmitted ? (
                <div className="py-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center border-4 border-green-300/50 mx-auto mb-4 shadow-2xl shadow-green-500/30">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank you!</h3>
                  <p className="text-gray-600">Your feedback helps us improve</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Rate Your Experience</h3>
                    <p className="text-gray-600 mb-6">How did the prank call go?</p>
                    
                    {/* Star Rating */}
                    <div className="flex justify-center space-x-2 mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setUserRating(star)}
                          className={`w-12 h-12 rounded-full transition-all duration-300 ${
                            star <= userRating
                              ? 'text-yellow-400 scale-110 drop-shadow-lg'
                              : 'text-gray-300 hover:text-yellow-300 hover:scale-105'
                          }`}
                        >
                          <Star className={`w-8 h-8 mx-auto ${star <= userRating ? 'fill-current' : ''}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment Box */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 text-left">
                      Tell us more (optional)
                    </label>
                    <textarea
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      placeholder="How did your friend react? Any funny moments?"
                      rows={4}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors duration-300 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleFeedbackSubmit}
                    className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white py-4 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-2xl hover:shadow-purple-500/40 border-2 border-white/20 text-lg"
                  >
                    Submit Feedback
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Show call status animation */}
          {!isComplete && !showFeedback && (
            <div className="text-center">
              {/* Connected Animation Container */}
              <div className="mb-8 relative">
                <div className="relative inline-block">
                  {/* Main phone with smooth morphing */}
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 transition-all duration-1000 ease-in-out shadow-2xl transform ${
                    currentStatusIndex === 0 ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 animate-pulse scale-100 border-purple-300/50 shadow-purple-500/30' :
                    currentStatusIndex === 1 ? 'bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400 animate-phone-ring scale-110 border-blue-300/50 shadow-blue-500/30' :
                    currentStatusIndex === 2 ? 'bg-gradient-to-br from-green-500 via-emerald-500 to-teal-400 animate-pulse scale-105 border-green-300/50 shadow-green-500/30' :
                    'bg-gradient-to-br from-green-600 via-emerald-600 to-green-500 scale-100 border-green-400/50 shadow-green-600/40'
                  }`}>
                    <Phone className={`w-12 h-12 transform transition-all duration-1000 ease-in-out ${
                      currentStatusIndex === 0 ? 'text-white rotate-12' :
                      currentStatusIndex === 1 ? 'text-blue-100 rotate-12' :
                      currentStatusIndex === 2 ? 'text-green-100 rotate-6' :
                      'text-green-100 rotate-0'
                    }`} />
                  </div>

                  {/* Smooth connecting rings */}
                  {currentStatusIndex === 1 && (
                    <>
                      <div className="absolute inset-0 w-24 h-24 rounded-full border-4 animate-ping border-blue-400/40 shadow-lg"></div>
                      <div className="absolute inset-0 w-24 h-24 rounded-full border-4 animate-ping border-blue-400/20 shadow-lg" style={{ animationDelay: '0.5s' }}></div>
                      <div className="absolute inset-0 w-24 h-24 rounded-full border-2 animate-ping border-blue-300/10" style={{ animationDelay: '1s' }}></div>
                    </>
                  )}

                  {/* Connected state glow */}
                  {currentStatusIndex === 2 && (
                    <div className="absolute inset-0 w-24 h-24 rounded-full bg-green-400/20 animate-pulse shadow-green-400/50 shadow-2xl"></div>
                  )}

                  {/* Completion success rings */}
                  {currentStatusIndex === 3 && (
                    <>
                      <div className="absolute inset-0 w-24 h-24 rounded-full bg-green-400/20 animate-pulse shadow-green-400/50 shadow-2xl"></div>
                      <div className="absolute inset-0 w-32 h-32 -m-4 rounded-full border-2 animate-ping border-green-400/30" style={{ animationDelay: '0.2s' }}></div>
                    </>
                  )}
                </div>
              </div>

              {/* Status Message with smooth transitions */}
              <div className="mb-6 transition-all duration-700 ease-in-out">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent mb-3 transition-all duration-700 ease-in-out">
                  {getMessage()}
                </h3>
                
                {/* Enhanced progress indicator with smooth connections */}
                <div className="flex justify-center items-center space-x-2 mb-4">
                  {STATUS_SEQUENCE.map((_, index) => (
                    <React.Fragment key={index}>
                      <div
                        className={`w-3 h-3 rounded-full transition-all duration-700 ease-in-out ${
                          index <= currentStatusIndex 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-125 shadow-lg shadow-purple-500/30' 
                            : 'bg-gray-300 scale-100'
                        }`}
                      />
                      {index < STATUS_SEQUENCE.length - 1 && (
                        <div 
                          className={`w-8 h-0.5 transition-all duration-700 ease-in-out ${
                            index < currentStatusIndex 
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-sm' 
                              : 'bg-gray-300'
                          }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <p className="text-gray-600 transition-all duration-700 ease-in-out text-lg">
                  {getSubtitle()}
                </p>
              </div>
            </div>
          )}

          {/* Prank Completed - Show Success and Actions */}
          {isComplete && !showFeedback && (
            <div className="text-center animate-fade-up">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center border-4 border-green-300/50 mx-auto mb-4 shadow-2xl shadow-green-500/30">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Prank Completed! 🎉
                </h3>
                <p className="text-gray-600 text-lg mb-2">
                  Your epic prank call with {targetName} was successful!
                </p>
                <p className="text-sm text-gray-500">
                  Hope they enjoyed the surprise! Ready for another one?
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={() => setShowFeedback(true)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-green-500/30 border-2 border-white/20 flex items-center justify-center space-x-2 text-lg"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Rate This Prank</span>
                </button>
                
                <button
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white py-4 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-2xl hover:shadow-purple-500/40 border-2 border-white/20 text-lg"
                >
                  Create Another Prank
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PrankModal;