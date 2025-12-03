import { useState } from 'react';
import { usePlayerStore } from '../lib/stores/usePlayerStore';
import { useGameStore } from '../lib/stores/useGameStore';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';

export function AlliancePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [allianceName, setAllianceName] = useState('');
  const [allianceTag, setAllianceTag] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const allianceId = usePlayerStore((state) => state.allianceId);
  const alliances = useGameStore((state) => state.alliances);
  const username = usePlayerStore((state) => state.username);

  const myAlliance = allianceId ? alliances.get(allianceId) : undefined;

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-36 bg-purple-700 hover:bg-purple-800"
      >
        🏰 Alliance
      </Button>
    );
  }

  return (
    <Card className="fixed top-16 right-4 w-96 max-h-[70vh] overflow-y-auto p-4 bg-stone-900/95 border-stone-700 text-white">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-purple-400">Alliance</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </Button>
      </div>

      {myAlliance ? (
        <div>
          <div className="bg-purple-900/30 rounded p-3 mb-4">
            <h4 className="text-lg font-bold text-purple-300">[{myAlliance.tag}] {myAlliance.name}</h4>
            <p className="text-sm text-gray-400">Members: {myAlliance.members.length}</p>
          </div>

          <div className="space-y-2">
            <h5 className="font-semibold text-amber-400">Alliance Features:</h5>
            <div className="text-sm space-y-1">
              {myAlliance.fort ? (
                <p className="text-green-400">✓ Alliance Fort (Level {myAlliance.fort.level})</p>
              ) : (
                <p className="text-gray-500">✗ Alliance Fort (Not built)</p>
              )}
              {myAlliance.turrets && myAlliance.turrets.length > 0 ? (
                <p className="text-green-400">✓ Alliance Turrets ({myAlliance.turrets.length})</p>
              ) : (
                <p className="text-gray-500">✗ Alliance Turrets (None)</p>
              )}
              {myAlliance.superMine ? (
                <p className="text-green-400">✓ Alliance Super Mine</p>
              ) : (
                <p className="text-gray-500">✗ Alliance Super Mine (Not built)</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <h5 className="font-semibold text-amber-400 mb-2">Members:</h5>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {myAlliance.members.map((memberId, idx) => (
                <div key={memberId} className="text-sm text-gray-300">
                  {memberId === myAlliance.leaderId && '👑 '}
                  Member {idx + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : showCreateForm ? (
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-400">Alliance Name:</label>
            <Input
              value={allianceName}
              onChange={(e) => setAllianceName(e.target.value)}
              placeholder="Enter alliance name"
              maxLength={30}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Alliance Tag (3-5 chars):</label>
            <Input
              value={allianceTag}
              onChange={(e) => setAllianceTag(e.target.value.toUpperCase())}
              placeholder="TAG"
              maxLength={5}
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setShowCreateForm(false)}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (allianceName && allianceTag.length >= 3) {
                  console.log('Creating alliance:', allianceName, allianceTag);
                  setShowCreateForm(false);
                }
              }}
              disabled={!allianceName || allianceTag.length < 3}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              Create
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-gray-400 text-sm">You are not in an alliance.</p>

          <Button
            onClick={() => setShowCreateForm(true)}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Create Alliance
          </Button>

          <div className="border-t border-stone-700 pt-3 mt-3">
            <h5 className="font-semibold text-amber-400 mb-2">Available Alliances:</h5>
            {Array.from(alliances.values()).length > 0 ? (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {Array.from(alliances.values()).map((alliance) => (
                  <div key={alliance.id} className="bg-stone-800 rounded p-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-purple-300">[{alliance.tag}] {alliance.name}</p>
                        <p className="text-xs text-gray-400">{alliance.members.length} members</p>
                      </div>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Join
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No alliances available</p>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
