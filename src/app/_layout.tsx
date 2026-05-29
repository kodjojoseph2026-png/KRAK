import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Icon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.45 }}>{emoji}</Text>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#121214',
          borderTopColor: '#29292e',
          borderTopWidth: 1,
          // Hauteur = contenu (50px) + safe area bas du téléphone
          height: 50 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 6,
        },
        tabBarActiveTintColor: '#00875f',
        tabBarInactiveTintColor: '#555',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          letterSpacing: 0.3,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Programme',
          tabBarIcon: ({ focused }) => <Icon emoji="📚" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="cours"
        options={{
          title: 'Mes Cours',
          tabBarIcon: ({ focused }) => <Icon emoji="📖" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="devoirs"
        options={{
          title: 'Devoirs',
          tabBarIcon: ({ focused }) => <Icon emoji="📝" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Recherche',
          tabBarIcon: ({ focused }) => <Icon emoji="🔍" focused={focused} />,
        }}
      />

      {/* Pages cachées de la nav bar */}
      <Tabs.Screen name="matiere/[nom]"   options={{ href: null }} />
      <Tabs.Screen name="matiere/devoir"  options={{ href: null }} />
    </Tabs>
  );
}
