import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { ComponentProps, Venue } from '../types';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';
import { typography } from '../styles/typography';
import { VenueCard } from '../components/venue/VenueCard';
import { mockVenues, venueCategories } from '../utils/mockData';
import { VenuesStackParamList } from '../navigation/VenuesNavigator';

interface Props extends ComponentProps, StackScreenProps<VenuesStackParamList, 'VenuesList'> {}

export const VenuesScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter venues based on search and category
  const filteredVenues = useMemo(() => {
    return mockVenues.filter((venue) => {
      const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           venue.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           venue.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || venue.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleVenuePress = (venue: Venue) => {
    navigation.navigate('VenueDetail', { venue });
  };

  const renderCategoryChip = (category: string) => {
    const isSelected = category === selectedCategory;
    return (
      <View
        key={category}
        style={[
          styles.categoryChip,
          isSelected && styles.categoryChipSelected,
        ]}
      >
        <Text 
          style={[
            styles.categoryChipText,
            isSelected && styles.categoryChipTextSelected,
          ]}
          onPress={() => setSelectedCategory(category)}
        >
          {category}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Venues</Text>
        <Text style={styles.subtitle}>
          {filteredVenues.length} venues available
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search venues, locations..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Ionicons 
              name="close-circle" 
              size={20} 
              color={colors.textMuted}
              onPress={() => setSearchQuery('')}
            />
          )}
        </View>
      </View>

      {/* Category Filters */}
      <View style={styles.filtersSection}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {venueCategories.map(renderCategoryChip)}
        </ScrollView>
      </View>

      {/* Venues List */}
      <FlatList
        data={filteredVenues}
        renderItem={({ item }) => (
          <VenueCard venue={item} onPress={handleVenuePress} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.venuesContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search" size={48} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No venues found</Text>
            <Text style={styles.emptyText}>
              Try adjusting your search or filters
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xxxl + spacing.lg,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.largeTitle,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodySecondary,
    textAlign: 'center',
  },
  searchSection: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 48,
    ...typography.body,
    color: colors.text,
  },
  filtersSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  categoriesContainer: {
    gap: spacing.sm,
  },
  categoryChip: {
    backgroundColor: colors.backgroundCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  categoryChipSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  categoryChipText: {
    ...typography.caption,
    fontWeight: '500',
  },
  categoryChipTextSelected: {
    color: colors.text,
    fontWeight: '600',
  },
  venuesContainer: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
  },
  emptyTitle: {
    ...typography.title,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.caption,
    textAlign: 'center',
    maxWidth: 280,
  },
}); 