import React from 'react';
import { Text, Alert } from 'react-native';
import { Button, Card } from '@/components/ui';
import { useAuthStore } from '@/store/authStore';
import { COLORS } from '@/utils/constants';

export const TestComponent: React.FC = () => {
  const { signOut, user, userProfile } = useAuthStore();

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: () => signOut()
        }
      ]
    );
  };

  return (
    <Card style={{ margin: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.primary, marginBottom: 12 }}>
        🧪 Authentication Test
      </Text>
      <Text style={{ color: COLORS.text.secondary, marginBottom: 8 }}>
        User: {user?.email}
      </Text>
      <Text style={{ color: COLORS.text.secondary, marginBottom: 8 }}>
        Display Name: {user?.displayName}
      </Text>
      <Text style={{ color: COLORS.text.secondary, marginBottom: 16 }}>
        Green Points: {userProfile?.greenPoints || 0}
      </Text>
      <Button 
        title="Sign Out" 
        onPress={handleSignOut}
        variant="outline"
      />
    </Card>
  );
};