import { server } from '@/main';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Input } from '../ui/input';
import Loading from '../Loading';
import moment from "moment";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Link } from 'react-router-dom';
import axios from 'axios';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${server}/api/order/admin/all`, {
        headers: {
          token: Cookies.get("token"),
        },
      });

      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/order/${orderId}`,
        { status },
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );

      toast.success(data.message);
      fetchOrders();
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.user.email.toLowerCase().includes(search.toLocaleLowerCase()) ||
      order._id.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );
   return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Orders</h1>

      <Input
        placeholder="search by email or order id"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/2"
      />

      {loading ? (
        <Loading />
      ) : filteredOrders.length > 0 ? (
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Id</TableHead>
                <TableHead>User Email</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>
                    <Link to={`/order/${order._id}`}>{order._id}</Link>
                  </TableCell>
                  <TableCell>{order.user.email}</TableCell>
                  <TableCell>{order.subTotal}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-white ${
                         order.status === "Pending"
      ? "bg-yellow-500"
      : order.status === "Shipped"
      ? "bg-blue-500"
      : order.status === "Delivered"
      ? "bg-green-500"
      : "bg-purple-500" // for Processing or others
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {moment(order.createdAt).format("DD MM YYYY")}
                  </TableCell>
                  <TableCell>
                    <select
                      value={order.status}
                      className="w-[150px] px-3 py-2 border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
                      onChange={(e) =>
                        updateOrderStatus(order._id, e.target.value)
                      }
                    > 
                      <option value="Processing">Processing</option>
                      <option value="Pending">Pending</option>
                      <option value={"Shipped"}>Shipped</option>
                      <option value={"Delivered"}>Delivered</option>
                    </select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </div>
      ) : (
        <p>No Orders</p>
      )}
    </div>
  );
};

export default OrdersPage;