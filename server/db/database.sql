CREATE TABLE employees (
    id UUID PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE services (
    id UUID PRIMARY KEY,
    name VARCHAR(255),
    duration INT,
    price NUMERIC
);

CREATE TABLE avaliability (
    id SERIAL PRIMARY KEY,
    employee_id UUID REFERENCES employees(id),
    services_id UUID REFERENCES services(id),
    date DATE NOT NULL,
    time TIME NOT NULL
);


INSERT INTO employees (id, name)
VALUES 
('08c6fd22-cb34-43ba-95a0-58fc60a3bcce', 'Nikola'),
('ea27140b-fd33-4e4b-8e16-1bf1f42253b6', 'Marija'),
('df7f09cd-7ac3-48c0-a4f3-3e84545a439e', 'Ana'),
('83e04fcb-a8ee-4352-8cc5-0b1df6500cb7', 'Luka'),
('1c09147c-8b85-44a6-a49b-778e14736383', 'Ema'),
('36c7a836-1d15-4eb6-8b24-8d084ec01930', 'Dina');


INSERT INTO services (id, name, duration, price)
VALUES 
('48d9e343-7a7d-4eae-ae59-47818cb8734f', 'Electrotherapy', 60, 100),
('0d53b689-3215-49f4-b999-aa011c9ab0aa', 'Ultrasound therapy', 30, 100),
('9371782a-94aa-4dbd-afc1-ee844e3674b0', 'Manual therapy', 60, 70),
('23563fb9-8eda-4cbb-b670-03fada84de70', 'Hydrotherapy', 60, 80),
('32c59316-d064-40c1-8f2a-6c3169e791c6', 'Laser therapy', 30, 120),
('a83b469d-5055-4ba1-be55-e1f9ae5a9149', 'Kinesiotherapy', 30, 90);
