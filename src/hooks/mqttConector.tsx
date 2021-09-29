import React, { createContext, useState, useContext, useEffect } from 'react'
import mqtt, {
	IClientOptions,
	IClientPublishOptions,
	IClientSubscribeOptions,
	MqttClient,
	Packet,
	PacketCallback,
} from '@taoqf/react-native-mqtt'


interface MqttContextData {
	publish(
		topic: string,
		message: string | Buffer,
		opts: IClientPublishOptions,
		callback: (
			topic_: string,
			payload: Buffer,
			packet: Packet,
			error?: Error
		) => void
	): void;
	subscribe(
		topic: string | string[],
		opts: IClientSubscribeOptions,
		callback: (
			topic_: string,
			payload: Buffer,
			packet: Packet,
			error: Error
		) => void
	): void;
	unsubscribe(
		topic_: string | string[],
		opts?: Record<string, unknown> | undefined,
		callback?: PacketCallback | undefined
	): MqttClient;
}

export interface MqttProps {
	brokerUrl?: string;
	options: IClientOptions;
}

interface IMQTTProvider {
	children: React.ReactNode
	mqttProps: MqttProps
}

const MqttContext = createContext<MqttContextData>({} as MqttContextData)

export const MqttProvider = ({
	children,
	mqttProps,
}: IMQTTProvider): JSX.Element => {
	const [clientMqtt,] = useState(() =>
		mqtt.connect(mqttProps.brokerUrl, mqttProps.options)
	)

	useEffect(() => {
		clientMqtt.on('connect', (packet: Packet) => {
			console.log('Connected in client: ')
		})

		// eslint-disable-next-line
		clientMqtt.on('reconnect', (a: any, b: any) => {
			console.log('Reconnecting', a, b)
		})

		clientMqtt.on('error', (err) => {
			console.error('Connection error: ', err)
			clientMqtt.end()
		})

		clientMqtt.on('disconnect', (packet: Packet) => {
			console.error('Disconnecting: ', packet)
			clientMqtt.end()
		})
	}, [clientMqtt])
	//const { unsubscribe } = clientMqtt

	const unsubscribe = (
		topic_: string | string[],
		opts?: Record<string, unknown> | undefined,
	): MqttClient => {
		clientMqtt.unsubscribe(topic_, { ...opts })
		return clientMqtt
	}

	const publish = (
		topic: string,
		message: string | Buffer,
		opts: IClientPublishOptions,
		callback: (
			topic_: string,
			payload: Buffer,
			packet: Packet,
			error?: Error
		) => void
	) => {
		// eslint-disable-next-line
		clientMqtt.publish(topic, message, opts, (error, packet) => {
			clientMqtt.on(
				'message',
				(topic_: string, payload: Buffer, packet_: Packet) => {
					callback(topic_, payload, packet_, error)
				}
			)
		})
	}

	const subscribe = (
		topic: string | string[],
		opts: IClientSubscribeOptions,
		callback: (
			topic_: string,
			payload: Buffer,
			packet: Packet,
			error: Error
		) => void
	) => {
		// eslint-disable-next-line
		clientMqtt.subscribe(topic, { ...opts }, (error, granted) => {
			clientMqtt.on(
				'message',
				(topic_: string, payload: Buffer, packet: Packet) => {
					callback(topic_, payload, packet, error)
				}
			)
		})
	}

	return (
		<MqttContext.Provider
			value={{
				publish,
				subscribe,
				unsubscribe,
			}}
		>
			{children}
		</MqttContext.Provider>
	)
}

export function useMqtt(): MqttContextData {
	const context = useContext(MqttContext)

	if (!context) {
		throw new Error('useMqtt must be used within an MqttProvider')
	}

	return context
}
