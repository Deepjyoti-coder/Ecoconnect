import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Card } from '@/components/ui';
import { COLORS, FONT_SIZES, SPACING } from '@/utils/constants';
import { AppStackParamList } from '@/navigation';

// Mock vendor data
const mockVendors = [
  {
    id: '1',
    name: 'Green Recycling Center',
    type: 'recycler',
    address: '123 Eco Street, Green City',
    distance: '0.5 km',
    rating: 4.8,
    services: ['Plastic', 'Paper', 'Metal'],
    isOpen: true,
  },
  {
    id: '2',
    name: 'EcoWaste Solutions',
    type: 'municipal',
    address: '456 Clean Avenue, Eco Town',
    distance: '1.2 km',
    rating: 4.5,
    services: ['Electronic', 'Hazardous', 'Organic'],
    isOpen: true,
  },
  {
    id: '3',
    name: 'Community Green Hub',
    type: 'ngo',
    address: '789 Sustainable Road, Green Valley',
    distance: '2.1 km',
    rating: 4.9,
    services: ['Plastic', 'Paper', 'Clothes'],
    isOpen: false,
  },
];

const getVendorTypeIcon = (type: string) => {
  switch (type) {
    case 'recycler': return '♻️';
    case 'municipal': return '🏛️';
    case 'ngo': return '🤝';
    default: return '📍';
  }
};

const getVendorTypeColor = (type: string) => {
  switch (type) {
    case 'recycler': return COLORS.primary;
    case 'municipal': return COLORS.secondary;
    case 'ngo': return COLORS.accent;
    default: return COLORS.text.secondary;
  }
};

type VendorsScreenNavigationProp = StackNavigationProp<AppStackParamList>;

export const VendorsScreen: React.FC = () => {
  const navigation = useNavigation<VendorsScreenNavigationProp>();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Plastic', 'Paper', 'Electronic', 'Metal'];

  const handleGetDirections = (vendor: any) => {
    Alert.alert(
      'Get Directions',
      `Open directions to ${vendor.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Open Maps', 
          onPress: () => {
            // In a real app, this would open the device's maps app
            Alert.alert('Success', 'Opening maps app...');
          }
        }
      ]
    );
  };

  const handleViewOnMap = () => {
    Alert.alert(
      'Map View',
      'Opening interactive map with all vendors...',
      [
        { text: 'OK', onPress: () => console.log('Map view opened') }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Find Recycling Centers</Text>
        <Text style={styles.subtitle}>Discover nearby places to recycle your waste</Text>
      </View>

      {/* Search/Filter Section */}
      <Card style={styles.searchCard}>
        <Text style={styles.searchText}>🔍 Search by location or waste type</Text>
        <View style={styles.filterContainer}>
          {filters.map((filter) => (
            <TouchableOpacity 
              key={filter}
              style={[
                styles.filterChip,
                selectedFilter === filter && styles.filterChipActive
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      {/* Vendors List */}
      <View style={styles.vendorsContainer}>
        {mockVendors.map((vendor) => (
          <Card key={vendor.id} style={styles.vendorCard}>
            <View style={styles.vendorHeader}>
              <View style={styles.vendorInfo}>
                <Text style={styles.vendorIcon}>{getVendorTypeIcon(vendor.type)}</Text>
                <View style={styles.vendorDetails}>
                  <Text style={styles.vendorName}>{vendor.name}</Text>
                  <Text style={[
                    styles.vendorType,
                    { color: getVendorTypeColor(vendor.type) }
                  ]}>
                    {vendor.type.charAt(0).toUpperCase() + vendor.type.slice(1)}
                  </Text>
                </View>
              </View>
              <View style={styles.vendorMeta}>
                <Text style={styles.vendorDistance}>{vendor.distance}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingStar}>⭐</Text>
                  <Text style={styles.ratingText}>{vendor.rating}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.vendorAddress}>{vendor.address}</Text>

            <View style={styles.servicesContainer}>
              <Text style={styles.servicesLabel}>Accepts:</Text>
              <View style={styles.servicesList}>
                {vendor.services.map((service, index) => (
                  <View key={index} style={styles.serviceChip}>
                    <Text style={styles.serviceText}>{service}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.vendorActions}>
              <View style={styles.statusContainer}>
                <View style={[
                  styles.statusDot,
                  { backgroundColor: vendor.isOpen ? COLORS.success : COLORS.error }
                ]} />
                <Text style={[
                  styles.statusText,
                  { color: vendor.isOpen ? COLORS.success : COLORS.error }
                ]}>
                  {vendor.isOpen ? 'Open' : 'Closed'}
                </Text>
              </View>
              <TouchableOpacity 
                style={styles.directionsButton}
                onPress={() => handleGetDirections(vendor)}
              >
                <Text style={styles.directionsText}>Get Directions</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </View>

      {/* Map View Button */}
      <TouchableOpacity 
        style={styles.mapButton}
        onPress={handleViewOnMap}
      >
        <Text style={styles.mapButtonText}>🗺️ View on Map</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
  },
  header: {
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
  },
  searchCard: {
    marginBottom: SPACING.lg,
  },
  searchText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    marginBottom: SPACING.md,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  filterChip: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    fontWeight: '600',
  },
  filterTextActive: {
    color: 'white',
  },
  vendorsContainer: {
    marginBottom: SPACING.lg,
  },
  vendorCard: {
    marginBottom: SPACING.md,
  },
  vendorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  vendorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vendorIcon: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  vendorDetails: {
    flex: 1,
  },
  vendorName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  vendorType: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  vendorMeta: {
    alignItems: 'flex-end',
  },
  vendorDistance: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStar: {
    fontSize: 16,
    marginRight: SPACING.xs,
  },
  ratingText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.primary,
    fontWeight: '600',
  },
  vendorAddress: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    marginBottom: SPACING.md,
  },
  servicesContainer: {
    marginBottom: SPACING.md,
  },
  servicesLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  servicesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  serviceChip: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  serviceText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.text.primary,
  },
  vendorActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.xs,
  },
  statusText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  directionsButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
  },
  directionsText: {
    fontSize: FONT_SIZES.sm,
    color: 'white',
    fontWeight: '600',
  },
  mapButton: {
    backgroundColor: COLORS.secondary,
    padding: SPACING.md,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  mapButtonText: {
    fontSize: FONT_SIZES.md,
    color: 'white',
    fontWeight: '600',
  },
});