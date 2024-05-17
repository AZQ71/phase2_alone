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
    return await customer.money_balance;
  } catch (error) {
    console.log(error);
  }
}

export async function updateBalance(username, amount) {
  try {
    const users = await fs.readJSON(usersFile);
    const user = users.find((user) => user.username == username);
    if (!user) {
      return { error: "User not found" };
    }
    if (user.money_balance < amount) {
      return { error: "Insufficient balance" };
    }
    user.money_balance -= amount;
    await fs.writeJSON(usersFile, users);
    return user;
  } catch (error) {
    console.log(error);
  }
}


// a function to get the purchase history of a specific user
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

export async function getSellers() {
  try {
    return prisma.customer.findMany()
  } catch (error) {
    return { error: error.message }
  }
}

export async function getSeller(custId) {
  try {
    return prisma.customer.findUnique({ where: { id: custId } })
  } catch (error) {
    return { error: error.message }
  }
}



export async function add_seller(user) {
  try {
    const users = await fs.readJSON(usersFile);
    const newUser = { ...user, id: nanoid() };
    users.push(newUser);
    await fs.writeJSON(usersFile, users);
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function update_seller(id, user) {
  try {
    const users = await fs.readJSON(usersFile);
    const index = users.findIndex((user) => user.username == id);
    // console.log(index);
    if (index == -1) {
      return null;
    }
    // console.log(index);
    user.username = id;
    users[index] = user;
    await fs.writeJSON(usersFile, users);
    return user;
  } catch (error) {
    console.log(error);
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
