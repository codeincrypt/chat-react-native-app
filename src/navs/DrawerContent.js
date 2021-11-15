import React from 'react';
import {View, StyleSheet, Image, Linking} from 'react-native';
import {Drawer, Text} from 'react-native-paper';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {APPSVERSION} from '../../../constant/config';

export function DrawerContent(props) {
  return (
    <>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.mainbg}>
            <Image
              style={styles.sidebarlogo}
              source={require('../../../assets/white-logo2.png')}
            />
          </View>
          <Drawer.Section>
            <Drawer.Item
              style={styles.lists}
              label={
                <Text>
                  {' '}
                  <Icon name={'shopping-cart'} size={14} color="#777" />{'  '} E-Commerce
                </Text>
              }
              onPress={() => props.navigation.navigate('Ecommerce')}
            />
            <Drawer.Item
              style={styles.lists}
              label={
                <Text>
                  {' '}
                  <Icon name={'shopping-bag'} size={14} color="#777" /> {'  '}{' '}
                  Customer Orders
                </Text>
              }
              onPress={() => props.navigation.navigate('CustomerOrder')}
            />

            <Drawer.Item
              style={styles.lists}
              label={
                <Text>
                  {' '}
                  <Icon name={'receipt'} size={14} color="#777" /> {'   '} Sales
                  Invoice
                </Text>
              }
              onPress={() => props.navigation.navigate('SalesInvoice')}
            />

            <Drawer.Item
              style={styles.lists}
              label={
                <Text>
                  {' '}
                  <Icon name={'archive'} size={14} color="#777" /> {'  '} Stocks
                </Text>
              }
              onPress={() => props.navigation.navigate('Stocks')}
            />

            <Drawer.Item
              style={styles.lists}
              label={
                <Text>
                  {' '}
                  <Icon name={'th-large'} size={14} color="#777" /> {'  '}{' '}
                  Business category
                </Text>
              }
              onPress={() => props.navigation.navigate('BusinessCategory')}
            />
          </Drawer.Section>

          <Drawer.Section>
            <Drawer.Item
              style={styles.lists}
              label={
                <Text>
                  {' '}
                  <Icon name={'rupee-sign'} size={14} color="#777" /> {'   '}{' '}
                  Payment
                </Text>
              }
              onPress={() => props.navigation.navigate('Payment')}
            />
            <Drawer.Item
              style={styles.lists}
              label={
                <Text>
                  {' '}
                  <Icon name={'user'} size={14} color="#777" /> {'  '} My
                  Account
                </Text>
              }
              onPress={() => props.navigation.navigate('Myaccount')}
            />
            <Drawer.Item
              style={styles.lists}
              label={
                <Text>
                  
                  <Icon name={'ticket-alt'} size={14} color="#777" /> {' '} Support
                </Text>
              }
              onPress={() => props.navigation.navigate('Ticket')}
            />
          </Drawer.Section>

          <Drawer.Section>
            <Drawer.Item
              style={styles.lists}
              label={
                <Text>
                  {' '}
                  <Icon name={'certificate'} size={14} color="#777" /> {'  '}{' '}
                  Store Certificate
                </Text>
              }
              onPress={() => props.navigation.navigate('Certificate')}
            />
            <Drawer.Item
              style={styles.lists}
              label={
                <Text>
                  {' '}
                  <Icon name={'address-card'} size={14} color="#777" /> {'  '}{' '}
                  Store ID
                </Text>
              }
              onPress={() => props.navigation.navigate('Idcard')}
            />

            <Drawer.Item
              style={styles.lists}
              label={
                <Text>
                  {' '}
                  <Icon name={'share'} size={14} color="#777" /> {'  '} Refer &
                  Earn
                </Text>
              }
              onPress={() => props.navigation.navigate('ReferEarn')}
            />
          </Drawer.Section>

          <Drawer.Section>
            <Drawer.Item
              label="Help Center"
              onPress={() => Linking.openURL('https://seller.lvkart.com/faq')}
            />
            <Drawer.Item
              label="Privacy Policy"
              onPress={() =>
                Linking.openURL('https://seller.lvkart.com/privacypolicy')
              }
            />
            <Drawer.Item
              label="Terms & Condition"
              onPress={() =>
                Linking.openURL('https://seller.lvkart.com/termsandcondition')
              }
            />
          </Drawer.Section>
          <Drawer.Section style={styles.bottomDrawerSection}>
            <Text style={{paddingLeft: 15, padding: 7, textAlign: 'right'}}>
              App Version - v{APPSVERSION}{' '}
            </Text>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  sidebarlogo: {
    width: '100%',
    height: 45,
    resizeMode: 'center',
  },
  mainbg: {
    backgroundColor: '#E30047',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  drawerContent: {
    flex: 1,
    marginTop: -5,
  },
  lists: {
    paddingTop: 1,
    paddingLeft: 5,
    paddingBottom: 1,
  },
  drawerSection: {
    marginTop: 10,
  },
  bottomDrawerSection: {
    marginBottom: 0,
  },
});
