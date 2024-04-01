'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

let pg_dbUp = `
  CREATE TABLE IF NOT EXISTS public.user (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(20) NOT NULL UNIQUE,
    user_email VARCHAR(40) NOT NULL UNIQUE,
    user_password VARCHAR(40) NOT NULL,
    user_status BOOLEAN NOT NULL DEFAULT FALSE
  );

  CREATE TABLE IF NOT EXISTS public.task_group (
    task_group_id SERIAL PRIMARY KEY,
    task_group_title VARCHAR(50) NOT NULL,
    task_group_description VARCHAR(200),
    task_group_created_at DATE,
    task_group_created_by_id INT,
    task_group_deadline DATE,
    task_group_notification BOOLEAN DEFAULT TRUE,
    task_group_status BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (task_group_created_by_id) REFERENCES public.user(user_id)
  );

  CREATE TABLE IF NOT EXISTS public.tasks (
    task_id SERIAL PRIMARY KEY,
    task_title VARCHAR(50) NOT NULL,
    task_description VARCHAR(200),
    task_created_at DATE,
    task_created_by_id INT,
    task_deadline DATE,
    task_notification BOOLEAN DEFAULT TRUE,
    task_status BOOLEAN DEFAULT FALSE, 
    task_group_id INT DEFAULT 0,
    task_have_subtasks BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (task_created_by_id) REFERENCES public.user(user_id),
    FOREIGN KEY (task_group_id) REFERENCES public.task_group(task_group_id)
  );

  CREATE TABLE IF NOT EXISTS public.task_relationship (
    from_task_id INT,
    to_task_id INT,
    PRIMARY KEY (from_task_id, to_task_id),
    FOREIGN KEY (from_task_id) REFERENCES public.tasks(task_id),
    FOREIGN KEY (to_task_id) REFERENCES public.tasks(task_id)
  );
`;

let pg_dpDown = `
  DROP TABLE IF EXISTS public.task_relationship;
  DROP TABLE IF EXISTS public.tasks;
  DROP TABLE IF EXISTS public.task_group;
  DROP TABLE IF EXISTS public.user;
`;

exports.up = function(db, callback) {
    db.runSql(pg_dbUp, function(err) {
        if (err) return callback(err);
        callback();
    });
};

exports.down = function(db, callback) {
    db.runSql(pg_dpDown, function(err) {
        if (err) return callback(err);
        callback();
    });
};

exports._meta = {
    "version": 1
};