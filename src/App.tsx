import React, { useState } from 'react';
import {
  User,
  MessageSquare,
  ExternalLink,
  Twitter,
  Linkedin,
  Globe,
  BookMarked,
  Medal,
  Heart,
  Headphones,
  MessageCircle,
  ThumbsUp,
  BadgeCheck,
  PenTool,
  DollarSign,
  Mic,
  Building2,
  ChevronDown,
  ChevronUp,
  Clock,
  Vote,
  Users,
  X,
} from 'lucide-react';

// Add new types
type Poll = {
  question: string;
  answer: 'strongly_disagree' | 'disagree' | 'neutral' | 'agree' | 'strongly_agree';
  date: string;
  comments: string;
};

type Conversation = {
  title: string;
  date: string;
  signed: boolean;
  backed: boolean;
  amount?: number;
  snippet?: string;
};

function App() {
  const [activeTab, setActiveTab] = useState<'activity' | 'podcasts' | 'speakers' | 'organizations' | 'polls'>('activity');
  const [expandedSpeaker, setExpandedSpeaker] = useState<string | null>(null);
  const [expandedOrg, setExpandedOrg] = useState<string | null>(null);
  const [expandedPodcast, setExpandedPodcast] = useState<string | null>(null);
  const [expandedPoll, setExpandedPoll] = useState<string | null>(null);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [proposalTopic, setProposalTopic] = useState('');

  // Add statistics data
  const statistics = {
    totalSigned: 35,
    totalBacked: 23,
    totalContributed: 2000,
    averageContribution: 87,
    activeMonths: 8,
    engagementRate: '92%'
  };

  const badges = [
    { icon: <Medal className="h-6 w-6 text-yellow-400" />, label: "Early Adopter", description: "One of the first 1000 users on the platform" },
    { icon: <ThumbsUp className="h-6 w-6 text-purple-400" />, label: "Top Contributor", description: "Contributed to over 50 conversations" },
    { icon: <Headphones className="h-6 w-6 text-blue-400" />, label: "Active Listener", description: "Engaged with 100+ hours of content" }
  ];

  // Add polls data
  const polls: Poll[] = [
    {
      question: "AI should be regulated by international bodies",
      answer: "agree",
      date: "2024-03-15",
      comments: "While innovation shouldn't be stifled, we need framework to ensure ethical development."
    },
    {
      question: "Remote work will become the dominant mode of work by 2030",
      answer: "strongly_agree",
      date: "2024-03-10",
      comments: "Technology and cultural shifts are already making this inevitable."
    },
    {
      question: "Blockchain technology will revolutionize education credentials",
      answer: "neutral",
      date: "2024-03-05",
      comments: "The potential is there, but adoption challenges remain significant."
    }
  ];

  // Add conversations data for organizations and podcasts
  const orgConversations: Record<string, Conversation[]> = {
    "TED": [
      {
        title: "The Future of AI in Education",
        date: "2024-03-15",
        signed: true,
        backed: true,
        amount: 250,
        snippet: "Discussion about AI's role in personalizing education..."
      },
      {
        title: "Sustainable Cities",
        date: "2024-03-10",
        signed: true,
        backed: false,
        snippet: "Exploring urban planning innovations..."
      }
    ],
    "Y Combinator": [
      {
        title: "Startup Funding in 2025",
        date: "2024-03-12",
        signed: true,
        backed: true,
        amount: 300,
        snippet: "Analysis of emerging funding trends..."
      }
    ]
  };

  const podcastConversations: Record<string, Conversation[]> = {
    "The Tim Ferriss Show": [
      {
        title: "Interview with Tech Pioneer",
        date: "2024-03-14",
        signed: true,
        backed: true,
        amount: 150
      },
      {
        title: "Future of Work Discussion",
        date: "2024-03-08",
        signed: true,
        backed: false
      }
    ]
  };

  const handleSparkUpClick = (topic?: string) => {
    setProposalTopic(topic || '');
    setShowProposalModal(true);
  };

  const ProposalModal = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      topic: proposalTopic,
      description: '',
      date: '',
      time: '',
      maxParticipants: '5',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle form submission
      setShowProposalModal(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-xl p-6 max-w-lg w-full mx-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Create SparkUp Proposal</h2>
            <button
              onClick={() => setShowProposalModal(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Topic</label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter discussion topic"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
                placeholder="Describe what you'd like to discuss..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Time</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Maximum Participants</label>
              <select
                value={formData.maxParticipants}
                onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="3">3 participants</option>
                <option value="5">5 participants</option>
                <option value="7">7 participants</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowProposalModal(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Create SparkUp
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderPollAnswer = (answer: Poll['answer']) => {
    const colors = {
      strongly_disagree: 'text-red-500',
      disagree: 'text-orange-500',
      neutral: 'text-yellow-500',
      agree: 'text-green-400',
      strongly_agree: 'text-green-500'
    };
    return (
      <span className={`font-medium ${colors[answer]}`}>
        {answer.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </span>
    );
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Add tabContent
  const tabContent = {
    activity: {
      title: "Recent Activity",
      data: [
        {
          title: "The Future of AI in Education",
          type: "Signed & Backed",
          signed: true,
          backed: true,
          amount: 250,
          date: "2 days ago",
          participants: [
            {
              name: "Sarah Anderson",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=60"
            },
            {
              name: "Simon Sinek",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            }
          ],
          organization: {
            name: "TED",
            image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&h=100&q=80"
          }
        }
      ]
    },
    podcasts: {
      title: "Favorite Podcasts",
      data: [
        {
          name: "The Tim Ferriss Show",
          signed: 12,
          backed: 8,
          totalContribution: 400
        },
        {
          name: "Masters of Scale",
          signed: 15,
          backed: 10,
          totalContribution: 750
        }
      ]
    },
    speakers: {
      title: "Favorite Speakers",
      data: [
        {
          name: "Simon Sinek",
          role: "Leadership Expert",
          conversations: 15,
          totalContribution: 600,
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          recentConversations: [
            {
              title: "The Future of Leadership",
              timestamp: "2024-03-15T14:30:00Z",
              snippet: "Discussing how AI will transform organizational leadership...",
              contribution: 200
            }
          ]
        }
      ]
    },
    organizations: {
      title: "Organizations Supported",
      data: [
        {
          name: "TED",
          totalContribution: 1200,
          conversations: 25,
          image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&h=100&q=80"
        }
      ]
    },
    polls: {
      title: "Polls & Opinions",
      data: polls
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'activity':
        return (
          <div className="space-y-5 max-w-2xl">
            {tabContent.activity.data.map((activity, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-base font-medium text-white">{activity.title}</p>
                    <p className="text-sm text-gray-400">{activity.date}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex -space-x-2">
                      {activity.participants.map((participant, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={participant.image}
                            alt={participant.name}
                            className="h-8 w-8 rounded-full border-2 border-gray-800"
                          />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-sm text-white rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                            {participant.name}
                          </div>
                        </div>
                      ))}
                    </div>
                    {activity.organization && (
                      <div className="relative group">
                        <img
                          src={activity.organization.image}
                          alt={activity.organization.name}
                          className="h-8 w-8 rounded-lg border border-purple-500/20"
                        />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-sm text-white rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                          {activity.organization.name}
                        </div>
                      </div>
                    )}
                    {activity.signed && <PenTool className="h-5 w-5 text-purple-400" title="Signed" />}
                    {activity.backed && (
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-5 w-5 text-green-400" title="Backed" />
                        <span className="text-sm font-medium text-green-400">${activity.amount}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'podcasts':
        return (
          <div className="space-y-4 max-w-2xl">
            {tabContent.podcasts.data.map((podcast, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <Headphones className="h-5 w-5 text-purple-400" />
                  <span className="text-gray-300">{podcast.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <PenTool className="h-4 w-4 text-purple-400" title="Episodes Signed" />
                    <span className="text-sm text-purple-300">{podcast.signed}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4 text-green-400" title="Episodes Backed" />
                    <span className="text-sm text-green-300">{podcast.backed}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-medium text-green-400">${podcast.totalContribution}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'speakers':
        return (
          <div className="space-y-4 max-w-2xl">
            {tabContent.speakers.data.map((speaker, index) => (
              <div key={index} className="rounded-lg bg-gray-700/30 hover:bg-gray-700/40 transition-all duration-200">
                <div
                  onClick={() => setExpandedSpeaker(expandedSpeaker === speaker.name ? null : speaker.name)}
                  className="flex items-center justify-between p-4 cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative group">
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="h-12 w-12 rounded-full border-2 border-purple-500/20 transition-transform duration-200 group-hover:scale-105"
                      />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-sm text-white rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                        {speaker.name}
                      </div>
                    </div>
                    <div>
                      <p className="text-base font-medium text-white">{speaker.name}</p>
                      <p className="text-sm text-gray-400">{speaker.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4 text-purple-400" title="Conversations" />
                        <span className="text-sm text-purple-300">{speaker.conversations}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium text-green-400">${speaker.totalContribution}</span>
                      </div>
                    </div>
                    {expandedSpeaker === speaker.name ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
                
                {/* Expanded Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedSpeaker === speaker.name ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-4 pt-0 space-y-3">
                    <div className="w-full h-px bg-gray-700" />
                    {speaker.recentConversations.map((conversation, idx) => (
                      <div key={idx} className="pl-16 pr-4 py-3 rounded-lg bg-gray-700/20">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-white">{conversation.title}</h4>
                          <div className="flex items-center space-x-3">
                            <span className="text-xs text-gray-400 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatDate(conversation.timestamp)}
                            </span>
                            <span className="text-sm font-medium text-green-400">${conversation.contribution}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400">{conversation.snippet}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'organizations':
        return (
          <div className="space-y-4 max-w-2xl">
            {tabContent.organizations.data.map((org, index) => (
              <div key={index} className="rounded-lg bg-gray-700/30 hover:bg-gray-700/40 transition-all duration-200">
                <div
                  onClick={() => setExpandedOrg(expandedOrg === org.name ? null : org.name)}
                  className="flex items-center justify-between p-4 cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative group">
                      <img
                        src={org.image}
                        alt={org.name}
                        className="h-10 w-10 rounded-lg border-2 border-purple-500/20 transition-transform duration-200 group-hover:scale-105"
                      />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-sm text-white rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                        {org.name}
                      </div>
                    </div>
                    <span className="text-base font-medium text-white">{org.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-400">{org.conversations} conversations</span>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4 text-green-400" />
                      <span className="text-sm font-medium text-green-400">${org.totalContribution}</span>
                    </div>
                    {expandedOrg === org.name ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedOrg === org.name ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-4 pt-0 space-y-3">
                    <div className="w-full h-px bg-gray-700" />
                    {orgConversations[org.name]?.map((conv, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-gray-700/20">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-white">{conv.title}</h4>
                          <div className="flex items-center space-x-3">
                            <span className="text-xs text-gray-400">{conv.date}</span>
                            {conv.signed && <PenTool className="h-4 w-4 text-purple-400" />}
                            {conv.backed && (
                              <div className="flex items-center space-x-1">
                                <DollarSign className="h-4 w-4 text-green-400" />
                                <span className="text-sm text-green-400">${conv.amount}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        {conv.snippet && (
                          <p className="text-sm text-gray-400">{conv.snippet}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'polls':
        return (
          <div className="space-y-4 max-w-2xl">
            {polls.map((poll, index) => (
              <div key={index} className="rounded-lg bg-gray-700/30 hover:bg-gray-700/40 transition-all duration-200">
                <div
                  onClick={() => setExpandedPoll(expandedPoll === poll.question ? null : poll.question)}
                  className="p-4 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-medium text-white">{poll.question}</h3>
                    {expandedPoll === poll.question ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Vote className="h-4 w-4 text-purple-400" />
                      {renderPollAnswer(poll.answer)}
                    </div>
                    <span className="text-sm text-gray-400">{poll.date}</span>
                  </div>
                  
                  <div
                    className={`mt-3 overflow-hidden transition-all duration-300 ${
                      expandedPoll === poll.question ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="w-full h-px bg-gray-700 mb-3" />
                    <p className="text-sm text-gray-300">{poll.comments}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSparkUpClick(poll.question);
                      }}
                      className="mt-3 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Invite to SparkUp
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 h-48 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80')] mix-blend-overlay opacity-10"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-24">
          {/* Profile Card */}
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
            <div className="sm:flex sm:items-start sm:justify-between">
              <div className="sm:flex sm:space-x-6">
                <div className="flex-shrink-0">
                  <img
                    className="mx-auto h-36 w-36 rounded-full border-4 border-purple-500/20 shadow-xl shadow-purple-500/10"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                    alt="Profile"
                  />
                </div>
                <div className="mt-6 sm:mt-0">
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-white">Sarah Anderson</h1>
                    <BadgeCheck className="ml-2 h-6 w-6 text-purple-400" />
                  </div>
                  <p className="mt-1 text-lg font-medium text- medium text-purple-300">Tech Enthusiast | Future of Work Advocate</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['Technology', 'AI Ethics', 'Future of Work', 'Education'].map((tag) => (
                      <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row gap-3">
                <button className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200">
                  <User className="h-5 w-5 mr-2" />
                  Follow
                </button>
                <button className="inline-flex items-center px-6 py-3 border border-gray-600 rounded-lg shadow-sm text-base font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors duration-200">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Message
                </button>
                <button
                  onClick={() => handleSparkUpClick()}
                  className="inline-flex items-center px-6 py-3 border border-gray-600 rounded-lg shadow-sm text-base font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Invite to SparkUp
                </button>
              </div>
            </div>

            {/* Bio and Stats */}
            <div className="mt-8 flex gap-8">
              {/* Bio */}
              <div className="flex-1 max-w-lg">
                <h2 className="text-xl font-semibold text-white">About</h2>
                <p className="mt-3 text-gray-300 leading-relaxed">
                  Passionate about exploring the intersection of technology and human connection. I believe in the power of meaningful conversations to drive change. Always eager to learn from diverse perspectives and contribute to discussions that matter.
                </p>
              </div>

              {/* Statistics */}
              <div className="flex-1 max-w-lg bg-gray-700/20 rounded-lg p-4">
                <h2 className="text-xl font-semibold text-white mb-4">Statistics</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Total Signed</p>
                    <p className="text-2xl font-bold text-purple-400">{statistics.totalSigned}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Backed</p>
                    <p className="text-2xl font-bold text-green-400">{statistics.totalBacked}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Contributed</p>
                    <p className="text-2xl font-bold text-green-400">${statistics.totalContributed}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Engagement Rate</p>
                    <p className="text-2xl font-bold text-purple-400">{statistics.engagementRate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links and Badges */}
            <div className="mt-8 flex justify-between items-center">
              <div className="flex space-x-5">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                  <Globe className="h-6 w-6" />
                </a>
              </div>
              <div className="flex gap-2">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className="group relative p-2 bg-gray-700/50 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors duration-200"
                  >
                    {badge.icon}
                    <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-900 text-sm text-gray-300 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <p className="font-medium text-white">{badge.label}</p>
                      <p className="text-xs mt-1">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Section */}
          <div className="mt-8">
            {/* Tabs */}
            <div className="flex space-x-1 mb-6 bg-gray-700/30 p-1 rounded-lg max-w-2xl">
              <button
                onClick={() => setActiveTab('activity')}
                className={`flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activeTab === 'activity'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Activity
              </button>
              <button
                onClick={() => setActiveTab('podcasts')}
                className={`flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activeTab === 'podcasts'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Headphones className="h-4 w-4 mr-2" />
                Podcasts
              </button>
              <button
                onClick={() => setActiveTab('speakers')}
                className={`flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activeTab === 'speakers'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Mic className="h-4 w-4 mr-2" />
                Speakers
              </button>
              <button
                onClick={() => setActiveTab('organizations')}
                className={`flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activeTab === 'organizations'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Building2 className="h-4 w-4 mr-2" />
                Organizations
              </button>
              <button
                onClick={() => setActiveTab('polls')}
                className={`flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activeTab === 'polls'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Vote className="h-4 w-4 mr-2" />
                Polls
              </button>
            </div>

            {/* Dynamic Content */}
            {renderContent()}
          </div>
        </div>
      </div>

      {/* SparkUp Proposal Modal */}
      {showProposalModal && <ProposalModal />}
    </div>
  );
}

export default App;