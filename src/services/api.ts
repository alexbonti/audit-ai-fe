import axios from 'axios';
import { Document, DocumentAnalysis } from '../types';

const API_URL = 'http://localhost:4000';

export const analyzeDocument = async (document: File): Promise<DocumentAnalysis> => {
  const formData = new FormData();
  formData.append('document', document);
  
  const response = await axios.post(`${API_URL}/analyze`, formData);
  return response.data;
};
