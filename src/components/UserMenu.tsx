
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { LogOut, User } from 'lucide-react';

const UserMenu = () => {
  const { user, signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };
  
  if (!user) {
    return null; // Don't render anything when user is not logged in
  }
  
  return (
    <div className="flex items-center space-x-4">
      <div className="hidden md:flex items-center space-x-2">
        <User className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">{user.name || user.email}</span>
      </div>
      <Button variant="ghost" size="sm" onClick={handleSignOut} className="flex items-center">
        <LogOut className="w-4 h-4 mr-2" />
        <span>Sign Out</span>
      </Button>
    </div>
  );
};

export default UserMenu;
