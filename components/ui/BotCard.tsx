"use client";

import {
  MoreHorizontal,
  Eye,
  Heart,
  Play,
  Trash2,
  Settings,
  ExternalLink,
  Edit,
} from "lucide-react";
import { Bot } from "@/types";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

interface BotCardProps {
  bot: Bot;
  onDelete: (botId: string) => void;
  onDeploy: (botId: string) => void;
  onLike: (botId: string) => void;
}

export default function BotCard({
  bot,
  onDelete,
  onDeploy,
  onLike,
}: BotCardProps) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [liked, setLiked] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const handleLike = () => {
    setLiked(!liked);
    onLike(bot.id);
  };

  const handleEdit = () => {
    router.push(`/bots/${bot.id}`);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${bot.name}"?`)) {
      onDelete(bot.id);
    }
  };

  const getStatusColor = (status: Bot["status"]) => {
    switch (status) {
      case "deployed":
        return "bg-green-900 text-green-300";
      case "error":
        return "bg-red-900 text-red-300";
      default:
        return "bg-yellow-900 text-yellow-300";
    }
  };

  // Position menu relative to button
  useEffect(() => {
    if (showMenu && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.right - 192 + window.scrollX, // 192px = width of menu
      });
    }
  }, [showMenu]);

  return (
    <div className="relative bg-black rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-200 group">
      {/* Bot Image */}
      <div className="relative h-48 bg-gray-700 overflow-hidden rounded-t-lg">
        <img
          src={bot.image}
          alt={bot.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              bot.status
            )}`}
          >
            {bot.status}
          </span>
        </div>

        {/* Menu Button */}
        <div className="absolute top-3 right-3">
          <button
            ref={buttonRef}
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dropdown Menu in Portal */}
      {showMenu &&
        createPortal(
          <div
            className="absolute w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-[9999]"
            style={{
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
              position: "absolute",
            }}
          >
            <div className="py-1">
              <button
                onClick={handleEdit}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Bot
              </button>
              <button
                onClick={() => setShowMenu(false)}
                className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <button
                onClick={() => setShowMenu(false)}
                className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center space-x-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View Bot</span>
              </button>
              <hr className="border-gray-700 my-1" />
              <button
                onClick={() => {
                  setShowMenu(false);
                  handleDelete();
                }}
                className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Bot</span>
              </button>
            </div>
          </div>,
          document.body
        )}

      {/* Bot Info */}
      <div className="p-4">
        <h3 className="text-white font-medium mb-2 line-clamp-2">{bot.name}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {bot.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{bot.views}</span>
            </div>
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 transition-colors ${
                liked ? "text-red-400" : "hover:text-red-400"
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
              <span>{bot.likes}</span>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          {bot.status !== "deployed" && (
            <button
              onClick={() => onDeploy(bot.id)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center space-x-1 transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Deploy</span>
            </button>
          )}
          <button className="flex-1 bg-black border hover:bg-gray-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
            {bot.status === "deployed" ? "Manage" : "Configure"}
          </button>
        </div>
      </div>
    </div>
  );
}