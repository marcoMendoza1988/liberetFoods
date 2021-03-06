import React, {Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableWithoutFeedback, 
    Image, 
    Alert, 
    Dimensions,
    FlatList
} from 'react-native';

import { Block, Button, GalioProvider } from 'galio-framework';
import { ScrollView } from 'react-native-gesture-handler';
import CalendarStrip from 'react-native-calendar-strip';
import Modal from 'react-native-modal';

import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import moment from 'moment';
import CurrencyFormat from 'react-currency-format';

const { width } = Dimensions.get('screen');

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
          food: {},
          filter: [],
          oClock: '11:00 am - 12:00 am',
          cooking: 'Beef',
          visible: false,
          selectedDate: new Date(),
          restaurant: false,
          services: []
        }
    }

    async fetchData(url){
        await fetch(url).then(res => res.json())
        .then(res => {
            //console.log(res)
            res.meals.map(async resp =>{
            let newres = resp
            await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${resp.idMeal}`).then(res => res.json())
            .then(res => {
                res.meals.map(respo => {
                newres = respo.strArea
                //console.log(respo.strArea)
                })
            })
            })
            //console.log(res)
            this.setState({food: res})
        })
        .catch(err => console.error(err));
    }

    async fetchServicios(url){
        await fetch(url).then(res => res.json())
        .then(res => {
            this.setState({services: res})
        })
        .catch(err => console.error(err));
    }

    componentDidMount(){
        //console.log(this.state.food)
        this.fetchData("https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef")
        this.fetchServicios("https://www.themealdb.com/api/json/v1/1/categories.php")
    }

    showModal(visible, time, restaurant, cooking){
        //console.log(restaurant)
        if(time){
            this.setState({visible: visible, oClock: time})
        }else if(restaurant){
            this.setState({visible: visible, restaurant: restaurant})
        }else if(cooking){
            this.fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cooking}`)
            this.setState({visible: visible, cooking: cooking, restaurant: false})
        }else{
            this.setState({visible: visible})
        }
    
    }
    calendarSelectedDay(e){
        this.setState({selectedDate: moment(e).format('L')})
        //console.log(e)
    }
    renderItem = ( { item } ) => (
        <TouchableWithoutFeedback 
            onPress={() => {
                Alert.alert(
                'Alert Title',
                'My Alert Msg',
                [
                    {
                    text: 'Ask me later',
                    onPress: () => console.log('Ask me later pressed')
                    },
                    {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
                );
            }
            }>
            <Block flex card style={{positon: 'absolute', padding: 5, marginBottom: 15, margin: 5}}>
                <Image
                    style={{height: 230,width: '100%'}}
                    resizeMode="cover"
                    source={{ uri: item.strMealThumb }}
                />
                <Block row style={{position: 'absolute', padding: 20, paddingLeft: 10, bottom: 30, justifyContent: 'center',alignItems: 'center'}}>
                    <Text muted style={{ left: 5, color: '#FFF'}}>{item.strMeal}</Text>
                </Block>
                <Block row style={{padding: 20,justifyContent: 'center',alignItems: 'center'}}>
                    <AntDesign name="clockcircleo" size={20} color="#FDC963" style={{position: 'absolute', left: 5,}} />
                    <CurrencyFormat value={item.idMeal} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <Text muted style={{position: 'absolute', right: 5,}}>{value}</Text>} />
                </Block>
            </Block>
        </TouchableWithoutFeedback>
    );
    render(){
        let { food, services } = this.state
        console.log(services.categories)
        return (
            <Block flex>
                <Block row>
                    <Block flex>
                        <Modal isVisible={this.state.visible}
                        style={styles.view}
                        swipeDirection={['up', 'left', 'right', 'down']}>
                            {this.state.restaurant ?
                            <Block style={styles.modalView}>
                            <Text><MaterialIcons name="restaurant" size={24} color="#FDC963" /> Elige un Servicio</Text>
                            {
                                services.categories && services.categories.map((res, key) => (
                                <Block row key={key} style={{marginBottom: 5, marginTop: 5}}>
                                    <Button color={'transparent'} textStyle={{color:'#4D4D4D'}}  style={{ borderColor: '#4D4D4D', borderRadius: 10, marginRight: 5, height: 40 }} onPress={() => this.showModal(false, null, false, `${res.strCategory}`)} ><Text>{res.strCategory}</Text></Button>
                                </Block>
                                ))
                            }
                            </Block>
                            :
                            <Block style={styles.modalView}>
                            <Text><AntDesign name="clockcircleo" size={20} color="#FDC963" /> Elige un horario de entrega</Text>
                            <Block  row style={{marginBottom: 5, marginTop: 5}}>
                                <Button color={'#E4E4E4'} textStyle={{color:'#4D4D4D'}}  style={{ borderColor: '#4D4D4D', borderRadius: 10, marginRight: 5, height: 40 }} onPress={() => this.showModal(false, '11:00 am - 12:00 am')} >11:00 am - 12:00 am</Button>
                            </Block>
                            <Block  row style={{marginBottom: 5, marginTop: 5}}>
                                <Button textStyle={{color: '#4D4D4D'}} color={'#E4E4E4'} style={{ borderColor: '#4D4D4D', borderRadius: 10, marginRight: 5, height: 40 }} onPress={() => this.showModal(false, '1:00 pm - 2:00 pm')} >1:00 pm - 2:00 pm</Button>
                            </Block>
                            <Block  row style={{marginBottom: 5, marginTop: 5}}>
                                <Button color={'#E4E4E4'} textStyle={{color: '#4D4D4D'}}  style={{ borderColor: '#4D4D4D', borderRadius: 10, marginRight: 5, height: 40 }}  onPress={() => this.showModal(false, '2:00 pm - 3:00 pm')} >2:00 pm - 3:00 pm</Button>
                            </Block>
                            </Block>
                            }
                        </Modal>
                    </Block>
                    </Block>
                    
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
                    <View style={{flex:1}}>
                    <CalendarStrip
                        showMonth={false}
                        style={{paddingTop: 20, paddingBottom: 10}}
                        customDatesStyles={[
                        {dateNumberStyle:{backgroundColor:'#FCBA3F', 
                        borderRadius: 15, 
                        paddingLeft: 8, 
                        paddingRight: 8, 
                        color: '#FFFFFF'}
                        }]}
                        onDateSelected={(date)=>this.calendarSelectedDay(date)}
                    />
                    </View>
                    <Block row middle style={{ marginTop: 10, marginBottom:10}}>
                        <Button textStyle={{color: '#4D4D4D'}} color={'#E4E4E4'} onPress={() => this.showModal(true,null, false)} icon="tags" iconFamily="antdesign" iconSize={30} iconColor="red" style={{ borderColor: '#4D4D4D', borderRadius: 15, marginRight: 5, width: '30%', height: 40 }}><Text style={{fontSize: 10}}><AntDesign name="clockcircleo" size={16} color="#FDC963" />{this.state.oClock}</Text></Button>
                        <Button textStyle={{color: '#4D4D4D'}} color={'#E4E4E4'}  onPress={() => this.showModal(true, false, true)} style={{ borderColor: '#4D4D4D', borderRadius: 15, marginRight: 5, width: '30%', height: 40 }}><Text  style={{fontSize: 13}}><MaterialIcons style={{position: 'absolute', left: 0}} name="restaurant" size={16} color="#FDC963" /> {this.state.cooking}</Text></Button>
                        <Button textStyle={{color: '#4D4D4D', fontSize: 13}} color={'#E4E4E4'} onPress={() => {
                            Alert.alert(
                            'Platillos',
                            '....',
                            [
                                {
                                text: 'Ask me later',
                                onPress: () => console.log('Ask me later pressed')
                                },
                                {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel'
                                },
                                { text: 'OK', onPress: () => console.log('OK Pressed') }
                            ],
                            { cancelable: false }
                            );
                        }} style={{ borderColor: '#4D4D4D', borderRadius: 15, marginRight: 5, width: '30%', height: 40 }}> 
                            <Text><Text bold style={{color:'#FCBA3F'}}>+1 </Text>Platillos</Text>
                        </Button>
                    </Block>
                    {
                        services.categories &&
                        <ScrollView horizontal={true}>  
                            {services.categories.map((res, key) => 
                                <Block flex key={res.strCategory} style={{marginBottom: 5, marginTop: 5}}>
                                    <TouchableWithoutFeedback onPress={()=> this.showModal(false, null, false, `${res.strCategory}`)}>
                                        <Image
                                            style={{height: 100, width: 100, borderRadius: 50, marginHorizontal: 5}}
                                            resizeMode="cover"
                                            source={{ uri: res.strCategoryThumb }}
                                        />
                                    </TouchableWithoutFeedback>
                                    <Text style={{textAlign: 'center', marginHorizontal: 5}}>{res.strCategory}</Text>
                                </Block>
                            )}
                        </ScrollView>
                    }
                    <Block flex style={{ position: 'relative', top: 20 }}>
                        <FlatList
                            data={food.meals}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id}
                            numColumns={2}
                        />
                    </Block>
                    </ScrollView>
                    <StatusBar style="auto" />
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 30,
    },
    tab: {
        backgroundColor: 'transparent',
        width: width * 0.50,
        borderRadius: 0,
        borderWidth: 0,
        height: 45,
        elevation: 1,
        width: '100%'
    },
    tabs: {
        marginBottom: 24,
        marginTop: 10,
        elevation: 4,
    },
    divider: {
        borderRightWidth: 0.3,
        borderRightColor: '#CECECE',
    },
    modalView: {
        margin: 5,
        marginTop: 100,
        backgroundColor: "white",
        borderRadius: 3,
        padding: 15,
        shadowColor: "#4D4D4D",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    view: {
        justifyContent: 'flex-start',
        margin: 0,
    },
});
