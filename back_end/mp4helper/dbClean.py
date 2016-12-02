#!/usr/bin/env python

"""
 * @file dbClean.py
 * Used in CS498RK MP4 to empty database of all users and tasks.
 *
 * @author Aswin Sivaraman
 * @date Created: Spring 2015
 * @date Modified: Spring 2015
"""

import sys
import getopt
import httplib
import urllib
import json

def usage():
    print 'dbClean.py -u <baseurl> -p <port>'

def getUsers(conn):
    # Retrieve the list of users
    conn.request("GET","""/api/users?filter={"_id":1}""")
    response = conn.getresponse()
    data = response.read()
    d = json.loads(data)

    # Array of user IDs
    users = [str(d['data'][x]['_id']) for x in xrange(len(d['data']))]

    return users

def getRequests(conn):
    # Retrieve the list of tasks
    conn.request("GET","""/api/requests?filter={"_id":1}""")
    response = conn.getresponse()
    data = response.read()
    d = json.loads(data)

    # Array of user IDs
    tasks = [str(d['data'][x]['_id']) for x in xrange(len(d['data']))]

    return tasks

def getChefs(conn):
    conn.request("GET","""/api/chefs?filter={"_id":1}""")
    response = conn.getresponse()
    data = response.read()
    d = json.loads(data);
    
    chefs = [str(d['data'][x]['_id']) for x in xrange(len(d['data']))]

    return chefs

def main(argv):

    # Server Base URL and port
    baseurl = "127.0.0.1"
    port = 8000

    try:
        opts, args = getopt.getopt(argv,"hu:p:",["url=","port="])
    except getopt.GetoptError:
        usage()
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
             usage()
             sys.exit()
        elif opt in ("-u", "--url"):
             baseurl = str(arg)
        elif opt in ("-p", "--port"):
             port = int(arg)

    # Server to connect to (1: url, 2: port number)
    conn = httplib.HTTPConnection(baseurl, port)

    # Fetch a list of users
    users = getUsers(conn)

    # Loop for as long as the database still returns users
    while len(users):

        # Delete each individual user
        for user in users:
            conn.request("DELETE","/api/users/"+user)
            response = conn.getresponse()
            data = response.read()

        # Fetch a list of users
        users = getUsers(conn)

    # Fetch a list of Requests
    requests = getRequests(conn)

    # Loop for as long as the database still returns requests
    while len(requests):

        # Delete each individual task
        for request in requests:
            conn.request("DELETE","/api/requests/"+request)
            response = conn.getresponse()
            data = response.read()

        # Fetch a list of tasks
        requests = getRequests(conn)
        
    chefs = getChefs(conn)
    while len(chefs):
        for chef in chefs:
            conn.request("DELETE","/api/chefs/"+chef)
            response = conn.getresponse();
            data = response.read()
        chefs = getChefs(conn)
    # Exit gracefully
    conn.close()
    print "All users, chefs, and requests removed at "+baseurl+":"+str(port)


if __name__ == "__main__":
     main(sys.argv[1:])