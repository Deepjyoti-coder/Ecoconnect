import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator } from './TabNavigator';
import { VendorsScreen } from '@/components/screens';
import { EditProfileScreen } from '@/components/screens/EditProfileScreen';
import { COLORS } from '@/utils/constants';

export type AppStackParamList = {
  MainTabs: { screen?: string } | undefined;
  Vendors: undefined;
  ChallengeDetails: { challengeId: string };
  PostDetails: { postId: string };
  UserProfile: { userId: string };
  EditProfile: undefined;
  Settings: undefined;
  Notifications: undefined;
  LearningResource: { resourceId: string };
};

const Stack = createStackNavigator<AppStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.surface,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.border,
        },
        headerTintColor: COLORS.text.primary,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        headerBackTitle: '',
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Vendors"
        component={VendorsScreen}
        options={{
          title: 'Recycling Centers',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: 'Edit Profile',
          headerShown: true,
        }}
      />
      {/* Additional stack screens will be added as we implement more features */}
    </Stack.Navigator>
  );
};