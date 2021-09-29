import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://ec2-34-229-201-239.compute-1.amazonaws.com:9000',
	// baseURL: 'http://192.168.0.12:9000',
});
