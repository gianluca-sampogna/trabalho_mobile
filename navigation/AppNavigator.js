import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import LanguageScreen from '../screens/LanguageScreen';
import HomeScreen from '../screens/HomeScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import TaskFormScreen from '../screens/TaskFormScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ReportsScreen from '../screens/ReportsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import AboutScreen from '../screens/AboutScreen';

import { useLanguage } from '../context/LanguageContext';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { t } = useLanguage();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label={t('languageTitle')} onPress={() => props.navigation.navigate('LanguageConfig')} />
      <DrawerItem label={t('logout')} onPress={() => props.navigation.replace('Login')} />
    </DrawerContentScrollView>
  );
}

function DrawerNavigator() {
  const { t } = useLanguage();
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HomeTab" component={HomeScreen} options={{ title: t('homeTitle') }} />
      <Drawer.Screen name="DashboardTab" component={DashboardScreen} options={{ title: t('dashboardTitle') }} />
      <Drawer.Screen name="CategoriesTab" component={CategoriesScreen} options={{ title: t('categoriesTitle') }} />
      <Drawer.Screen name="ProfileTab" component={ProfileScreen} options={{ title: t('profileTitle') }} />
      <Drawer.Screen name="ReportsTab" component={ReportsScreen} options={{ title: t('reportsTitle') }} />
      <Drawer.Screen name="NotificationsTab" component={NotificationsScreen} options={{ title: t('notificationsTitle') }} />
      <Drawer.Screen name="AboutTab" component={AboutScreen} options={{ title: t('aboutTitle') }} />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="LanguageConfig" component={LanguageScreen} />
        <Stack.Screen name="MainApp" component={DrawerNavigator} />
        <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ headerShown: true, title: 'Detalhes' }} />
        <Stack.Screen name="TaskForm" component={TaskFormScreen} options={{ headerShown: true, title: 'Nova Tarefa' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
