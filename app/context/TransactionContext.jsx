import { useState, useEffect, createContext } from "react";
import { Alert, Platform } from "react-native";
import { db } from "../utils/firebase";
import { collection,
    addDoc,
    deleteDoc,
    orderBy,
    getDocs,
    doc,
    limit,
    query,
    where,
    updateDoc} from "firebase/firestore"; 
import { UserAuth } from "./AuthContext";


const TransactionContext = createContext();

export const TransactionProvider= ({children}) => {
    const { user } = UserAuth();
    const [transactionList, setTransactionList] = useState([]);
    const [transactionEdit,setTransactionEdit] = useState({
    transaction: {},
    edit: false,
    })

    useEffect(() => {
        const fetchTransaction = async () => {
            if (!user || !user.uid){
                return;
            }
            try {
                const transListRef = collection(db, "transactionList");
                const que = query(transListRef, orderBy("title"), where("uid", "==", user.uid), limit(60));
                const querySnapShot = await getDocs(que);
                const transList = querySnapShot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }));
                setTransactionList(transList);
            } catch (err) {
                console.log(err)
            }
        };
        fetchTransaction();
    }, [user]);
    //get monthly total
    const getMonthlyTotals = () => {
        const monthlyTotals = {};
        transactionList.forEach((t) => {
            const { type, amount, date } = t.data;

            const transDate = new Date(date);
            if (isNaN(transDate.getTime())) return; // skip invalid dates

            const monthYear = transDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
            });
            if (!monthlyTotals[monthYear]) {
                monthlyTotals[monthYear] = { income: 0, expense: 0 };
            }
             const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

            if (type === "income") {
                monthlyTotals[monthYear].income += numericAmount;
            } else if (type === "expense") {
                monthlyTotals[monthYear].expense += numericAmount;
            }
        });
        return monthlyTotals;          
    };

    //Add transaction
    const addTransaction= async(newTrans) => {
        if (!user || !user.uid){
            alert("You must be logged in to add a transaction.");
            return;
        }
        const transactionWithUid = { ...newTrans, uid: user.uid };
        try {
            const docRef = await addDoc(collection(db, "transactionList"), transactionWithUid);
            console.log("Document written with ID: ", docRef.id);
            setTransactionList((preTrans) => [
                ...preTrans,
                {id: docRef.id, data: newTrans}
            ]);
        }catch(err) {
            console.log(err)
        }
    }

    //Edit transaction
    const editTransaction= (trans) => {
        setTransactionEdit({ trans, edit: true});
    };

    //update transaction
    const updateTransaction= async (id, updatedTrans) => {
        const docRef =  doc(db, "transactionList", id);
        console.log(id, docRef);
        await updateDoc(docRef, updatedTrans);
        // setTransactionList((preTrans) => [
        //         ...preTrans,
        //         {id: docRef.id, data: updatedTrans}
        //     ]);
        setTransactionList((prev) =>
            prev.map((item) =>
                item.id === id ? { id, data: updatedTrans } : item
            )
            );
    };

    //delete transaction
    const deleteTransaction= async (id) => {
            try {
                const docRef = doc(db, "transactionList", id);
                await deleteDoc(docRef);
                // setTransactionList(transactionList);
                setTransactionList((prev) => {
                    const updatedList = prev.filter((item) => item.id !== id);
                    console.log("Updated list after delete: ", updatedList)
                    return updatedList;
                }); 
            } catch(err) {
                console.log(err)
            }
    };

    const confirmDeleteTransaction=(id) => {
        if (Platform.OS === 'web') {
            const confirmed = window.confirm("Are you sure you want to delete?");
            if (confirmed) {
                deleteTransaction(id);
            }
        } else {
            Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete?",
            [
                { text: "Cancel", style: "cancel" },
                {
                text: "Delete",
                style: "destructive",
                onPress: () => deleteTransaction(id),
                },
            ],
            { cancelable: true }
            );
        }
    }


  return (
    <TransactionContext.Provider  value={{ transactionList, 
    addTransaction, editTransaction, 
    updateTransaction, deleteTransaction, confirmDeleteTransaction, transactionEdit, getMonthlyTotals}}> 
    {children}
    </TransactionContext.Provider>
  )
}

export default TransactionContext;