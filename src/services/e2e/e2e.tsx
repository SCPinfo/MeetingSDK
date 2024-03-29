/**
 * Insertable streams.
 *
 * https://github.com/webrtc/samples/blob/gh-pages/src/content/insertable-streams/endtoend-encryption/js/main.js
 */





//const logger = new Logger('e2e');

const e2eSupported:any= undefined;
const worker:any= undefined;

export function isSupported()
{
	if (e2eSupported === undefined)
	{
		/*if (RTCRtpSender.prototype.createEncodedStreams)
		{
			try
			{
				const stream = new ReadableStream();

				window.postMessage(stream, '*', [ stream ]);
				worker = new Worker('/resources/js/e2e-worker.js', { name: 'e2e worker' });

				logger.debug('isSupported() | supported');

				e2eSupported = true;
			}
			catch (error)
			{
				logger.debug(`isSupported() | not supported: ${error}`);

				e2eSupported = false;
			}
		}
		else
		{
			logger.debug('isSupported() | not supported');

			e2eSupported = false;
		}*/
	}

	return e2eSupported;
}

export function setCryptoKey(operation:any, key:any, useCryptoOffset:any)
{
	/*logger.debug(
		'setCryptoKey() [operation:%o, useCryptoOffset:%o]',
		operation, useCryptoOffset);*/

	assertSupported();

	worker.postMessage(
		{
			operation        : operation,
			currentCryptoKey : key,
			useCryptoOffset  : useCryptoOffset
		});
}

export function setupSenderTransform(sender:any)
{
/*	logger.debug('setupSenderTransform()');*/

	assertSupported();

	const senderStreams = sender.createEncodedStreams();
	const readableStream = senderStreams.readable || senderStreams.readableStream;
	const writableStream = senderStreams.writable || senderStreams.writableStream;

	worker.postMessage(
		{
			operation : 'encode',
			readableStream,
			writableStream
		},
		[ readableStream, writableStream ]
	);
}

export function setupReceiverTransform(receiver:any)
{
/*	logger.debug('setupReceiverTransform()');*/

	assertSupported();

	const receiverStreams = receiver.createEncodedStreams();
	const readableStream = receiverStreams.readable || receiverStreams.readableStream;
	const writableStream = receiverStreams.writable || receiverStreams.writableStream;

	worker.postMessage(
		{
			operation : 'decode',
			readableStream,
			writableStream
		},
		[ readableStream, writableStream ]
	);
}

function assertSupported()
{
	if (e2eSupported === false)
		throw new Error('e2e not supported');
	else if (e2eSupported === undefined)
		throw new Error('e2e not initialized, must call isSupported() first');
}
