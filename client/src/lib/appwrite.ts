import { Client, Account, Databases, Storage, ID, Query } from 'appwrite';

// Appwrite configuration
export const appwriteConfig = {
  endpoint: process.env.REACT_APP_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
  projectId: process.env.REACT_APP_APPWRITE_PROJECT_ID!,
  databaseId: process.env.REACT_APP_APPWRITE_DATABASE_ID!,
  userCollectionId: process.env.REACT_APP_APPWRITE_USER_COLLECTION_ID || 'users',
  profileCollectionId: process.env.REACT_APP_APPWRITE_PROFILE_COLLECTION_ID || 'profiles',
  storageId: process.env.REACT_APP_APPWRITE_STORAGE_ID!,
};

// Create Appwrite client
const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

// Debug configuration
if (process.env.NODE_ENV === 'development') {
  console.log('Appwrite Config:', {
    endpoint: appwriteConfig.endpoint,
    projectId: appwriteConfig.projectId,
    databaseId: appwriteConfig.databaseId,
    origin: window.location.origin
  });
}

// Services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Types
export interface UserProfile {
  $id?: string;
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  state: string;
  city: string;
  bio: string;
  primaryLanguages: string[];
  culturalInterests: string[];
  skills: string[];
  teachingAbilities: string[];
  hobbies: string[];
  age: number;
  gender: string;
  points: number;
  level: number;
  $createdAt?: string;
  $updatedAt?: string;
}

// Auth functions
export const createUserAccount = async (user: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    
    if (!newAccount) throw new Error('Account creation failed');
    
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;
    
    const newUser: UserProfile = {
      userId: newAccount.$id,
      name: user.name,
      email: user.email,
      avatar: avatarUrl,
      state: '',
      city: '',
      bio: '',
      primaryLanguages: [],
      culturalInterests: [],
      skills: [],
      teachingAbilities: [],
      hobbies: [],
      age: 0,
      gender: '',
      points: 0,
      level: 1,
    };
    
    await saveUserToDB(newUser);
    
    return newAccount;
  } catch (error) {
    console.error('Create user account error:', error);
    throw error;
  }
};

export const signInAccount = async (user: {
  email: string;
  password: string;
}) => {
  try {
    const session = await account.createEmailPasswordSession(user.email, user.password);
    return session;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error('No current user');
    
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.profileCollectionId,
      [Query.equal('userId', currentAccount.$id)]
    );
    
    if (!currentUser.documents.length) {
      throw new Error('User profile not found');
    }
    
    return currentUser.documents[0] as unknown as UserProfile;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
};

export const signOutAccount = async () => {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

// Database functions
export const saveUserToDB = async (user: UserProfile) => {
  try {
    const newUserDocument = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.profileCollectionId,
      ID.unique(),
      user
    );
    
    return newUserDocument;
  } catch (error) {
    console.error('Save user to DB error:', error);
    throw error;
  }
};

export const updateUserProfile = async (profileId: string, updates: Partial<UserProfile>) => {
  try {
    const updatedProfile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.profileCollectionId,
      profileId,
      updates
    );
    
    return updatedProfile;
  } catch (error) {
    console.error('Update user profile error:', error);
    throw error;
  }
};

export const getAllProfiles = async () => {
  try {
    const profiles = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.profileCollectionId,
      [Query.limit(100)]
    );
    
    return profiles.documents as unknown as UserProfile[];
  } catch (error) {
    console.error('Get all profiles error:', error);
    throw error;
  }
};

// Storage functions
export const uploadFile = async (file: File) => {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );
    
    return uploadedFile;
  } catch (error) {
    console.error('Upload file error:', error);
    throw error;
  }
};

export const getFilePreview = (fileId: string) => {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      200,
      200
    );
    
    return fileUrl;
  } catch (error) {
    console.error('Get file preview error:', error);
    throw error;
  }
};

export const deleteFile = async (fileId: string) => {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);
    return true;
  } catch (error) {
    console.error('Delete file error:', error);
    throw error;
  }
};

// Utility functions for profile recommendations
export const calculateCosineSimilarity = (profile1: UserProfile, profile2: UserProfile): number => {
  // Create feature vectors for both profiles
  const getFeatureVector = (profile: UserProfile) => {
    const features = [
      ...profile.culturalInterests,
      ...profile.skills,
      ...profile.teachingAbilities,
      ...profile.hobbies,
      profile.state
    ];
    return features;
  };

  const vector1 = getFeatureVector(profile1);
  const vector2 = getFeatureVector(profile2);
  
  // Get all unique features
  const allFeatures = Array.from(new Set([...vector1, ...vector2]));
  
  // Create binary vectors
  const binaryVector1 = allFeatures.map(feature => vector1.includes(feature) ? 1 : 0);
  const binaryVector2 = allFeatures.map(feature => vector2.includes(feature) ? 1 : 0);
  
  // Calculate cosine similarity
  const dotProduct = binaryVector1.reduce((sum: number, val, i) => sum + val * binaryVector2[i], 0);
  const magnitude1 = Math.sqrt(binaryVector1.reduce((sum: number, val) => sum + val * val, 0));
  const magnitude2 = Math.sqrt(binaryVector2.reduce((sum: number, val) => sum + val * val, 0));
  
  if (magnitude1 === 0 || magnitude2 === 0) return 0;
  
  return dotProduct / (magnitude1 * magnitude2);
};

export const getRecommendedProfiles = async (currentUser: UserProfile) => {
  try {
    const allProfiles = await getAllProfiles();
    const otherProfiles = allProfiles.filter(profile => profile.userId !== currentUser.userId);
    
    const profilesWithSimilarity = otherProfiles.map(profile => ({
      ...profile,
      similarity: calculateCosineSimilarity(currentUser, profile)
    }));
    
    // Sort by similarity and return top 5
    return profilesWithSimilarity
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5);
  } catch (error) {
    console.error('Get recommended profiles error:', error);
    return [];
  }
};

export { ID, Query };