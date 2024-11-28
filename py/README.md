To Start the Python venv, type: source venv/bin/activate

To Start, execute: python app.py

Note: You may need to append the Directory/Folder path accordingly prior to executing the above command...eg: <DIR-PATH/python app.py>

Launch Browser, and visit: http://127.0.0.1:21900/

To Stop, press CTRL+C.
If you close the terminal window or command prompt where the Flask server is running, it will automatically stop. However, this is not a "graceful" shutdown and may terminate any ongoing requests. For development purposes, it is generally fine, but it's better to stop it with CTRL + C if possible.

To exit the Python venv, type: deactivate