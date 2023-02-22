import {Router  } from "express";
import {getEmployees,createEmployee,updateEmployee,deleteEmployee, getEmployee} from '../controllers/employees.controller.js';

const router = Router();

router.get('/employees', getEmployees)

router.get('/employees/:id', getEmployee)

router.post('/employees', createEmployee)

router.patch('/employees/:id',updateEmployee)// la diferencia es que  con patch se puede actualizar solo algunos de los empleados

router.delete('/employees/:id',deleteEmployee)
export default router
