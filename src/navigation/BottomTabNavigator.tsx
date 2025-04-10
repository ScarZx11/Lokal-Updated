import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import JobsScreen from '../screens/JobsScreen';
import BookmarksScreen from '../screens/BookmarksScreen';

// Define your tab parameters
export type RootTabParamList = {
  Jobs: undefined;
  Bookmarks: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

// Type for tab bar icon props
type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#64748b',
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Jobs" 
        component={JobsScreen}
        options={{
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <MaterialIcons name="work" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Bookmarks" 
        component={BookmarksScreen}
        options={{
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <MaterialIcons name="bookmark" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}