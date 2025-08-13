import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { 
  HomeScreen, 
  CameraScreen, 
  ProfileScreen, 
  LeaderboardScreen,
  ChallengesScreen
} from '@/components/screens';

import { COLORS, SPACING, FONT_SIZES } from '@/utils/constants';
import { AppStackParamList } from './AppNavigator';

const Tab = createBottomTabNavigator();

type TabNavigationProp = StackNavigationProp<AppStackParamList>;

// Custom tab bar icon component
const TabIcon: React.FC<{ 
  icon: string; 
  focused: boolean; 
  label: string;
}> = ({ icon, focused }) => (
  <View style={styles.tabIconContainer}>
    <Text style={[
      styles.tabIcon, 
      { color: focused ? COLORS.primary : COLORS.text.light }
    ]}>
      {icon}
    </Text>
  </View>
);

// Custom header component
const CustomHeader: React.FC<{ 
  title: string; 
  showSettings?: boolean;
  showNotifications?: boolean;
}> = ({ title, showSettings = false, showNotifications = false }) => {
  const navigation = useNavigation<TabNavigationProp>();

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.headerActions}>
        {showNotifications && (
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Text style={styles.headerButtonText}>🔔</Text>
          </TouchableOpacity>
        )}
        {showSettings && (
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.headerButtonText}>⚙️</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.text.light,
        headerStyle: {
          backgroundColor: COLORS.surface,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.border,
        },
        headerTitleStyle: {
          fontSize: FONT_SIZES.lg,
          fontWeight: '600',
          color: COLORS.text.primary,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: () => <CustomHeader title="EcoConnect" showNotifications={true} />,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🏠" focused={focused} label="Home" />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          headerShown: false, // Camera screen handles its own header
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🔍" focused={focused} label="Scan" />
          ),
        }}
      />
      <Tab.Screen
        name="Challenges"
        component={ChallengesScreen}
        options={{
          header: () => <CustomHeader title="Eco Challenges" />,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🎯" focused={focused} label="Challenges" />
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          header: () => <CustomHeader title="Leaderboard" />,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🏆" focused={focused} label="Leaderboard" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: () => <CustomHeader title="Profile" showSettings={true} />,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="👤" focused={focused} label="Profile" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    height: 80,
    paddingBottom: SPACING.sm,
    paddingTop: SPACING.sm,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  header: {
    backgroundColor: COLORS.surface,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.sm,
  },
  headerButtonText: {
    fontSize: 20,
  },
});