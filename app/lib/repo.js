import fs from "fs-extra";
import { nanoid } from "nanoid";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


const usersFile = "data/users.json";

// Items part.
export async function getItems() {
  try {
    return prisma.item.findMany()
  } catch (error) {
    return { error: error.message }
  }
}

export async function getItem(id) {
  const parsedId =  parseInt(id);
  try {
    return prisma.item.findUnique({ where: {id:parsedId}})
    
  } catch (error) {
    return { error: error.message }
  }
}

export async function updateItem(id, item) {
  const parsedId =  parseInt(id);
  try {
    return prisma.item.update({
      where: { id: parsedId },
      data: item
    })
  } catch (error) {
    return { error: error.message }
  }
}

export async function deleteItem(id) {
  const parsedId =  parseInt(id);
  try {
    return prisma.item.delete({
      where: { id: parsedId }


    });
  } catch (error) {
    console.log(error);
  }
}

export async function addItem(item) {
    try {
			return prisma.item.create({ data: item })
		} catch (error) {
			return { error: error.message }
		}
}

// Customers part.
export async function getCustomers() {
  try {
    return prisma.customer.findMany()
  } catch (error) {
    return { error: error.message }
  }
}

export async function getCustomer(username) {
  try {
    return prisma.customer.findUnique({ where: { username } })
  } catch (error) {
    return { error: error.message }
  }
}

export async function getCustomerLogin(username, password) {
  try {
    return prisma.customer.findFirst({ where: {
      AND: [ {username},{password}] }})
  } catch (error) {
    return { error: error.message }
  }
}


export async function addCustomer(customer) {
 
		try {
			return prisma.customer.create({ data: customer })
		} catch (error) {
			return { error: error.message }
		}
	
}

export async function updateCustomer(username, customer) {
  try {
    return prisma.customer.update({
      where: { username: username },
      data: customer
    })
  } catch (error) {
    return { error: error.message }
  }
}

export async function getBalance(username) {
  try {
    const customer = await getCustomer(username);
    return customer.money_balance;
  } catch (error) {
    console.log(error);
  }
}

export async function updateBalance(username, amount) {
  try{
    return prisma.customer.update({
      where: { username: username},
      data: {money_balance: amount}
    }
  )
  }
  catch(error){
    return { error: error.message }
  }
  
}

export async function getPurchaseHistory(id) {
  try {
    const users = await fs.readJSON(usersFile);
    const user = users.find((user) => user.id == id);
    if (!user) {
      return { error: "User not found" };
    }
    return user.purchase_history;
  } catch (error) {
    console.log(error);
  }
}


//Seller part.
export async function getSellers() {
  try {
    return prisma.seller.findMany()
  } catch (error) {
    return { error: error.message }
  }
}

export async function getSeller(username) {
  try {
    return prisma.seller.findUnique({ where: { username: username } })
  } catch (error) {
    return { error: error.message }
  }
}

export async function getSellerLogin(username, password) {
  try {
    return prisma.seller.findFirst({ where: {
      AND: [ {username},{password}] }})
  } catch (error) {
    return { error: error.message }
  }}


export async function addSeller(seller) {
 
  try {
    return prisma.seller.create({ data: seller })
  } catch (error) {
    return { error: error.message }
  }
}

export async function updateSeller(username, seller) {
  try {
    return prisma.seller.update({
      where: { username: username },
      data: seller
    })
  } catch (error) {
    return { error: error.message }
  }
}

export async function getSellHistory(id) {
  try {
    const users = await fs.readJSON(usersFile);
    const user = users.find((user) => user.id == id);
    if (!user) {
      return { error: "User not found" };
    }
    return user.sellHistory;
  } catch (error) {
    console.log(error);
  }
}

// a function to update the sellHistory array in the users.json file after a successful sale
export async function updateSellHistory(id, item) {
  try {
    const users = await fs.readJSON(usersFile);
    const user = users.find((user) => user.id == id);
    if (!user) {
      return { error: "User not found" };
    }
    user.sellHistory.push(item);
    await fs.writeJSON(usersFile, users);
    return user;
  } catch (error) {
    console.log(error);
  }
}
