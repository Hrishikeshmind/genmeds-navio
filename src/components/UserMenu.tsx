
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, LogOut, User } from 'lucide-react';

const UserMenu = () => {
  const { user, signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };
  
  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Link to="/signin">
          <Button variant="ghost" size="sm" className="flex items-center">
            <LogIn className="w-4 h-4 mr-2" />
            <span>Sign In</span>
          </Button>
        </Link>
        <Link to="/signup">
          <Button variant="default" size="sm" className="flex items-center">
            <UserPlus className="w-4 h-4 mr-2" />
            <span>Sign Up</span>
          </Button>
        </Link>
      </div>
    );
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
