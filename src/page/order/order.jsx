import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const Order = () => {
  const [fetchedOrders, setFetchedOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({ orderDate: '', status: '' });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/order/create', newOrder);
      setFetchedOrders([...fetchedOrders, response.data]);
      handleClose();
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/order/delete/${id}`);
      setFetchedOrders(fetchedOrders.filter(order => order.id !== id));
      setConfirmOpen(false);
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleConfirmOpen = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/order/findall');
        console.log(response.data);
        setFetchedOrders(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <div>
        <h1 className='text-2xl font-bold text-warna-pecel flex justify-center'>PECEL LELE 21</h1>
      </div>
      <div className=" flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-warna-pecel flex justify-center">List Order</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-4 justify-center"
          onClick={handleClickOpen}
        > 
         Tambah Order Baru <AddIcon />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-warna-pecel backdrop-blur-lg bg-opacity-30 border-gray-300 rounded-lg shadow-xl border-2 text-[#F8FCFF] font-bold">
          <thead className="bg-gray-200 backdrop-blur-sm bg-opacity-50">
            <tr>
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">Tanggal Order</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {[...fetchedOrders].map((orderItem, index) => (
              <tr
                key={orderItem.id}
                className="backdrop-blur-sm bg-opacity-50  hover:bg-opacity-100"
              >
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">{orderItem.orderDate}</td>
                <td className="px-4 py-2 border">{orderItem.status}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleConfirmOpen(orderItem.id)}
                  >
                     <RemoveIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tambah Order Baru</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="orderDate"
            label="Tanggal Order"
            type="date"
            fullWidth
            value={newOrder.orderDate}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="status"
            label="Status"
            type="text"
            fullWidth
            value={newOrder.status}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Batal
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Tambah
          </Button>
        </DialogActions>
      </Dialog>

      <div className={`fixed z-10 inset-0 overflow-y-auto ${confirmOpen ? '' : 'hidden'}`}>
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <RemoveIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Konfirmasi Hapus Order
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Apakah Anda yakin ingin menghapus order ini? Tindakan ini tidak dapat dibatalkan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => handleDelete(deleteId)}
              >
                Hapus
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={handleConfirmClose}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;