import express from 'express';
import { Router } from 'express';
import { Member } from './members.model';
import pool from '../../config/dbconfig';
import {cors} from '../../config/cors';

const membersRouter = express.Router();

membersRouter.route('/')
.options(cors.)
