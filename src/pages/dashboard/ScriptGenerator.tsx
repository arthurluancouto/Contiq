import { useState } from 'react';
import { 
  PenTool, Link as LinkIcon, Image, Youtube, Globe, 
  FileText, Target, Sparkles, ArrowRight, Plus, X,
  MessageSquare, RefreshCw, Copy, Download, Clock,
  Facebook, Twitter, Instagram, Linkedin, Send
} from 'lucide-react';

interface ExampleInput {
  id: string;
  type: 'link' | 'image';
  url: string;
  title: string;
}

interface TargetAudience {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface SocialPlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface PublishedScript {
  id: string;
  topic: string;
  platform: string;
  duration: string;
  audience: string;
  content: string;
  timestamp: Date;
}

const socialPlatforms: SocialPlatform[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    icon: <Youtube size={20} className="text-white" />,
    color: 'bg-red-500/20 hover:bg-red-500/30'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: <Instagram size={20} className="text-white" />,
    color: 'bg-pink-500/20 hover:bg-pink-500/30'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: <Facebook size={20} className="text-white" />,
    color: 'bg-blue-600/20 hover:bg-blue-600/30'
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: <Twitter size={20} className="text-white" />,
    color: 'bg-sky-500/20 hover:bg-sky-500/30'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: <Linkedin size={20} className="text-white" />,
    color: 'bg-blue-700/20 hover:bg-blue-700/30'
  }
];

const durationOptions = [
  { value: '30', label: '30 seconds' },
  { value: '60', label: '1 minute' },
  { value: '180', label: '3 minutes' },
  { value: '300', label: '5 minutes' },
  { value: '600', label: '10 minutes' },
  { value: 'custom', label: 'Custom duration' }
];

const Code = ({ size, className }: { size: number, className: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const BookOpen = ({ size, className }: { size: number, className: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const TrendingUp = ({ size, className }: { size: number, className: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const targetAudiences: TargetAudience[] = [
  {
    id: 'general',
    name: 'General Audience',
    description: 'Suitable for a broad range of viewers with varying levels of expertise.',
    icon: <Globe size={20} className="text-blue-400" />
  },
  {
    id: 'technical',
    name: 'Technical Audience',
    description: 'For viewers with technical knowledge or industry expertise.',
    icon: <Code size={20} className="text-green-400" />
  },
  {
    id: 'educational',
    name: 'Educational',
    description: 'Focused on teaching and explaining concepts clearly.',
    icon: <BookOpen size={20} className="text-yellow-400" />
  },
  {
    id: 'marketing',
    name: 'Marketing/Sales',
    description: 'Optimized for promotional and persuasive content.',
    icon: <TrendingUp size={20} className="text-purple-400" />
  }
];

const ScriptGenerator = () => {
  const [scriptTopic, setScriptTopic] = useState('');
  const [selectedAudience, setSelectedAudience] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [customDuration, setCustomDuration] = useState<string>('');
  const [exampleInputs, setExampleInputs] = useState<ExampleInput[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [publishedScripts, setPublishedScripts] = useState<PublishedScript[]>([]);

  const handleAddExample = (type: 'link' | 'image') => {
    if (!inputUrl.trim()) return;

    const newExample: ExampleInput = {
      id: Date.now().toString(),
      type,
      url: inputUrl,
      title: inputTitle || inputUrl
    };

    setExampleInputs([...exampleInputs, newExample]);
    setInputUrl('');
    setInputTitle('');
  };

  const handleRemoveExample = (id: string) => {
    setExampleInputs(exampleInputs.filter(example => example.id !== id));
  };

  const handleGenerateScript = async () => {
    if (!scriptTopic || !selectedAudience || !selectedPlatform || (!selectedDuration && selectedDuration !== 'custom') || (selectedDuration === 'custom' && !customDuration)) return;
    
    setIsGenerating(true);

    try {
      const duration = selectedDuration === 'custom' ? customDuration : selectedDuration;
      
      const response = await fetch('https://n8n-fc4c0o0swcokkww040kcswoc.erickto.dev/webhook-test/90937f5c-cdd2-4e0a-b41f-3d09cd9ff642', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scriptTopic,
          platform: selectedPlatform,
          duration,
          targetAudience: selectedAudience,
          examples: exampleInputs
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate script');
      }

      const scriptText = await response.text();
      setGeneratedScript(scriptText);
    } catch (error) {
      console.error('Error generating script:', error);
      setGeneratedScript('Failed to generate script. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = () => {
    if (!generatedScript) return;

    const newScript: PublishedScript = {
      id: Date.now().toString(),
      topic: scriptTopic,
      platform: selectedPlatform,
      duration: selectedDuration === 'custom' ? customDuration : selectedDuration,
      audience: selectedAudience,
      content: generatedScript,
      timestamp: new Date()
    };

    setPublishedScripts([newScript, ...publishedScripts]);
    
    // Reset form
    setScriptTopic('');
    setSelectedPlatform('');
    setSelectedDuration('');
    setCustomDuration('');
    setSelectedAudience('');
    setExampleInputs([]);
    setGeneratedScript('');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold mb-1">Script Generator</h1>
        <p className="text-white/60">Create engaging scripts powered by AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Script Topic */}
          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <PenTool size={20} className="text-neon-red" />
              Script Topic
            </h2>
            <textarea
              value={scriptTopic}
              onChange={(e) => setScriptTopic(e.target.value)}
              placeholder="Enter your script topic or main idea..."
              className="w-full h-32 bg-lighter-gray/20 border border-white/10 rounded-lg p-4 focus:outline-none focus:ring-1 focus:ring-neon-red/50 text-white resize-none"
            />
          </div>

          {/* Social Platform Selection */}
          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Globe size={20} className="text-neon-red" />
              Social Platform
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {socialPlatforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedPlatform === platform.id
                      ? 'border-neon-red bg-neon-red/10'
                      : `border-white/10 ${platform.color}`
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {platform.icon}
                    <span className="font-medium">{platform.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Video Duration */}
          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock size={20} className="text-neon-red" />
              Video Duration
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {durationOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedDuration(option.value)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedDuration === option.value
                      ? 'border-neon-red bg-neon-red/10'
                      : 'border-white/10 bg-lighter-gray/20 hover:bg-lighter-gray/30'
                  }`}
                >
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>

            {selectedDuration === 'custom' && (
              <div className="mt-4">
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={customDuration}
                    onChange={(e) => setCustomDuration(e.target.value)}
                    placeholder="Enter duration in seconds"
                    className="flex-1 bg-lighter-gray/20 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-neon-red/50 text-white"
                    min="1"
                  />
                  <span className="text-white/70">seconds</span>
                </div>
              </div>
            )}
          </div>

          {/* Example Inputs */}
          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Globe size={20} className="text-neon-red" />
              Reference Examples
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="Enter URL or upload image..."
                  className="flex-1 bg-lighter-gray/20 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-neon-red/50 text-white"
                />
                <button
                  onClick={() => handleAddExample('link')}
                  className="btn-primary px-4 py-2"
                >
                  <Plus size={20} />
                </button>
              </div>
              
              <input
                type="text"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                placeholder="Title (optional)"
                className="w-full bg-lighter-gray/20 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-neon-red/50 text-white"
              />
            </div>

            {exampleInputs.length > 0 && (
              <div className="space-y-3">
                {exampleInputs.map((example) => (
                  <div 
                    key={example.id}
                    className="flex items-center gap-3 bg-lighter-gray/20 p-3 rounded-lg"
                  >
                    {example.type === 'link' ? (
                      <LinkIcon size={20} className="text-blue-400" />
                    ) : (
                      <Image size={20} className="text-purple-400" />
                    )}
                    <div className="flex-1 truncate">
                      <p className="font-medium truncate">{example.title}</p>
                      <p className="text-sm text-white/50 truncate">{example.url}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveExample(example.id)}
                      className="text-white/50 hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Target Audience */}
          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target size={20} className="text-neon-red" />
              Target Audience
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {targetAudiences.map((audience) => (
                <button
                  key={audience.id}
                  onClick={() => setSelectedAudience(audience.id)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedAudience === audience.id
                      ? 'border-neon-red bg-neon-red/10'
                      : 'border-white/10 bg-lighter-gray/20 hover:bg-lighter-gray/30'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {audience.icon}
                    <span className="font-medium">{audience.name}</span>
                  </div>
                  <p className="text-sm text-white/60 text-left">
                    {audience.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerateScript}
            disabled={!scriptTopic || !selectedAudience || !selectedPlatform || (!selectedDuration && selectedDuration !== 'custom') || (selectedDuration === 'custom' && !customDuration) || isGenerating}
            className={`w-full btn-primary py-4 flex items-center justify-center gap-2 ${
              (!scriptTopic || !selectedAudience || !selectedPlatform || (!selectedDuration && selectedDuration !== 'custom') || (selectedDuration === 'custom' && !customDuration)) && 'opacity-50 cursor-not-allowed'
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw size={20} className="animate-spin" />
                Generating Script...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate Script
              </>
            )}
          </button>
        </div>

        {/* Generated Script */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FileText size={20} className="text-neon-red" />
              Generated Script
            </h2>
            {generatedScript && (
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg bg-lighter-gray/30 hover:bg-lighter-gray/50 transition-colors">
                  <Copy size={18} />
                </button>
                <button className="p-2 rounded-lg bg-lighter-gray/30 hover:bg-lighter-gray/50 transition-colors">
                  <Download size={18} />
                </button>
              </div>
            )}
          </div>

          {generatedScript ? (
            <div className="space-y-4">
              <textarea
                value={generatedScript}
                onChange={(e) => setGeneratedScript(e.target.value)}
                className="w-full h-[400px] bg-lighter-gray/20 border border-white/10 rounded-lg p-4 focus:outline-none focus:ring-1 focus:ring-neon-red/50 text-white font-mono resize-none"
              />
              <button
                onClick={handlePublish}
                className="w-full btn-primary py-3 flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Publish Script
              </button>
            </div>
          ) : (
            <div className="h-[500px] flex flex-col items-center justify-center text-center p-6 bg-lighter-gray/20 rounded-lg border border-white/10">
              <Sparkles size={48} className="text-white/20 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Script Generated Yet</h3>
              <p className="text-white/60 max-w-md">
                Fill in the script topic, select platform and duration, add reference examples (optional), and select your target audience to generate an engaging script.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Published Scripts Section */}
      {publishedScripts.length > 0 && (
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <FileText size={20} className="text-neon-red" />
            Published Scripts
          </h2>
          
          <div className="space-y-4">
            {publishedScripts.map((script) => (
              <div 
                key={script.id}
                className="p-4 bg-lighter-gray/20 rounded-lg border border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">{script.topic}</h3>
                  <span className="text-sm text-white/60">
                    {new Date(script.timestamp).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 mb-3 text-sm text-white/70">
                  <span>Platform: {script.platform}</span>
                  <span>Duration: {script.duration}s</span>
                  <span>Audience: {script.audience}</span>
                </div>
                
                <div className="bg-lighter-gray/30 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap font-mono text-sm">
                    {script.content}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScriptGenerator;