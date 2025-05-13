import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native'
import { PieChart } from "react-native-chart-kit";
import Header from '../components/shared/Header';
import { useContext } from 'react';
import TransactionContext from '../context/TransactionContext';

export default function Summary() {
  const { transactionList } = useContext(TransactionContext);
  const screenWidth = Dimensions.get("window").width;

  const totalsByType = { income: 0, expense: 0 };

  transactionList.forEach((t) => {
    const { type, amount } = t.data;
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (type === 'income' || type === 'expense') {
      totalsByType[type] += numericAmount;
    }
  });

  
  const pieChartData = [
    {
      name: 'Income',
      population: totalsByType.income,
      color: '#4CAF50', // green
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: 'Expense',
      population: totalsByType.expense,
      color: '#F44336', // red
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    }
  ];

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  return (
  <SafeAreaView style={{ flex: 1 }}>
    <Header name="Rin"/>
    <View style={styles.chartContainer}>
      {(totalsByType.income > 0 || totalsByType.expense > 0) ? (
          <PieChart
            data={pieChartData}
            height={300}
            width={screenWidth}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft={35}
            center={[0, 0]}
          />
        ) : (
          <Text style={styles.noDataText}>No transactions to display</Text>
        )}
      <Text>This is summary page</Text>
    </View>
    
  </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  }
})